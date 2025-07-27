import Tour from "@/models/tour";
import connectDB from "../connectDB";
import mongoose from "mongoose";

// گرفتن همه تورها
const getAllTours = async (filters = {}) => {
  // console.log(filters);

  let tours = await Tour.find(filters).lean();

  return tours;
};

// گرفتن تور بر اساس آی‌دی
const getTourById = async (id) => {
  const tour = await Tour.findById(id);
  return tour;
};

// ایجاد تور جدید
const createTour = async (tourData) => {
  const newTour = new Tour(tourData);
  await newTour.save();
  return newTour;
};

// به‌روزرسانی تور بر اساس آی‌دی
const updateTour = async (id, updatedData) => {
  const updatedTour = await Tour.findByIdAndUpdate(id, updatedData, {
    new: true,
  });
  return updatedTour; // اگر نبود null برمی‌گردد
};

// حذف تور
const deleteTour = async (id) => {
  const deletedTour = await Tour.findByIdAndDelete(id);
  return deletedTour; // اگر نبود null برمی‌گردد
};

async function getFilteredTours(query) {
  try {
    await connectDB();

    const { destinationId, originId, startDate, endDate } = query;
    // console.log({ destinationId, originId, startDate, endDate } )
    const filters = {};

    if (destinationId && mongoose.isValidObjectId(destinationId)) {
      filters.destinationId = new mongoose.Types.ObjectId(destinationId);
    }

    if (originId && mongoose.isValidObjectId(originId)) {
      filters.originId = new mongoose.Types.ObjectId(originId);
    }

    if (startDate) {
      filters.startDate = { $gte: new Date(startDate) };
    }

    if (endDate) {
      filters.endDate = { $lte: new Date(endDate) };
    }

    const tours = await getAllTours(filters);
    return tours;
  } catch (error) {
    console.error("Error in getFilteredTours:", error.message);
    throw new Error({ message: error.message });
  }
}

async function getByIdTours(params) {
  try {
    await connectDB();

    const {id}=params

    if (!id) {
      throw new Error("ID تور الزامی است.");
    }

    const tour = await getTourById(id);
    if (!tour) {
      return res.status(404).json({ message: "تور درخواستی وجود ندارد!" });
    }

    return tour;
  } catch (error) {
    console.error("Error in getFilteredTours:", error.message);
    throw new Error({ message: error.message });
  }
}

export {
  getAllTours,
  getTourById,
  createTour,
  updateTour,
  deleteTour,
  getFilteredTours,
  getByIdTours,
};
