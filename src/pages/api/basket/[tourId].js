import { verifyToken } from "@/lib/verifyToken";
import Basket from "@/models/basket";
import connectDB from "@/utils/connectDB";
import { getTourById } from "@/utils/crudModels/Tour";

async function handler(req, res) {
    if (req.method !== "PUT") {
    return res.status(405).json({ message: "فقط درخواست PUT مجاز است." });
  }

  const { tourId } = req.query;
  const userId = req.user.id;

  if (!tourId) {
    return res.status(400).json({ message: "ID تور الزامی است." });
  }

  try {
    await connectDB();

    const tour = await getTourById(tourId);
    if (!tour) {
      return res.status(404).json({ message: "تور درخواستی وجود ندارد!" });
    }

    const plainTour = tour.toObject();

    const tourData = {
      userId,
      tourId: tour._id,
      origin: plainTour.origin,
      destination: plainTour.destination,
      startDate: plainTour.startDate,
      endDate: plainTour.endDate,
      title: plainTour.title,
      fleetVehicle: plainTour.fleetVehicle,
      price: plainTour.price,
      availableSeats: plainTour.availableSeats,
      insurance: plainTour.insurance,
      options: plainTour.options,
      image: plainTour.image,
    };

    const updatedCart = await Basket.findOneAndUpdate({ userId }, tourData, {
      new: true,
      upsert: true,
    });

    res.status(201).json({
      message: `تور ${tour.title} به سبد خرید شما افزوده شد.`,
      basket: updatedCart,
    });
  } catch (err) {
    console.error("Error in addToBasket:", err.message);
    res.status(500).json({ message: "افزودن تور به سبد خرید" });
  }
}

export default verifyToken(handler);
