import { verifyToken } from "@/lib/verifyToken";
import Basket from "@/models/basket";
import connectDB from "@/utils/connectDB";
import { createOrder } from "@/utils/crudModels/Order";
import { getTourById, updateTour } from "@/utils/crudModels/Tour";
import { createTransaction } from "@/utils/crudModels/Transaction";

async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ message: "فقط درخواست POST مجاز است." });
  }

  const { nationalCode, fullName, gender, birthDate } = req.body;

  if (!nationalCode || !fullName || !gender || !birthDate) {
    return res.status(400).json({ message: "تمامی فیلدهای ضروری را پر کنید!" });
  }

  const userId = req.user.id;
  try {
    await connectDB();

    let basket = await Basket.findOne({ userId });

    // Apply filters manually
    if (!basket) {
      return res.status(404).json({ message: "سبد خرید شما خالی است" });
    }
    const tourId = basket?.tourId;

    // Validate tour
    const tour = await getTourById(tourId);
    if (!tour) {
      return res.status(404).json({ message: "تور درخواستی یافت نشد!" });
    }

    // Check seat availability
    if (tour.availableSeats <= 0) {
      return res.status(400).json({ message: "ظرفیت تور پر است!" });
    }

    // Create order
    const orderData = {
      userId: req.user.id,
      tourId,
      nationalCode,
      fullName,
      gender,
      birthDate: new Date(birthDate),
    };
    const order = await createOrder(orderData);

    // Create transaction
    const transactionData = {
      userId: req.user.id,
      amount: tour.price,
      type: "Purchase",
      createdAt: new Date(),
    };
    const transaction = await createTransaction(transactionData);

    // Update tour seats
    const updatedTour = await updateTour(tourId, {
      availableSeats: tour.availableSeats - 1,
    });
    const deletedBasket = await Basket.findOneAndDelete({ userId });

    if (!deletedBasket) {
      return res.status(404).json({ message: "سبد خرید پیدا نشد." });
    }

    res.json({ message: "تور با موفقیت خریداری شد." });
  } catch (err) {
    console.error("Error in createOrder:", err.message);
    res.status(500).json({ message: "خطا در ایجاد سفارش." });
  }
}

export default verifyToken(handler);
