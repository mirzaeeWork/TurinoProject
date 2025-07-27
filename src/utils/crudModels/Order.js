import Order from "@/models/order";
import mongoose from "mongoose";



// گرفتن همه سفارش‌ها
const getAllOrders = async () => {
  return await Order.find({});
};

// گرفتن سفارش بر اساس آی‌دی
const getOrderById = async (id) => {
  return await Order.findById(id);
};

// گرفتن اولین سفارش بر اساس userId (اگر فقط یکی می‌خوای)
const getOrderByUserId = async (userId) => {
  return await Order.findOne({ userId: new mongoose.Types.ObjectId(userId) });
};

// گرفتن همه سفارش‌ها بر اساس userId
const getOrdersByUserId = async (userId) => {
  return await Order.find({ userId: new mongoose.Types.ObjectId(userId) });
};

// ایجاد سفارش جدید
const createOrder = async (orderData) => {
  const newOrder = new Order(orderData);
  await newOrder.save();
  return newOrder;
};

// به‌روزرسانی سفارش بر اساس آی‌دی
const updateOrder = async (id, updatedData) => {
  const updatedOrder = await Order.findByIdAndUpdate(id, updatedData, { new: true });
  return updatedOrder; // اگر نبود null برمی‌گردد
};

// حذف سفارش بر اساس آی‌دی
const deleteOrder = async (id) => {
  const deletedOrder = await Order.findByIdAndDelete(id);
  return deletedOrder; // اگر نبود null برمی‌گردد
};

export {
  getAllOrders,
  getOrderById,
  getOrderByUserId,
  getOrdersByUserId,
  createOrder,
  updateOrder,
  deleteOrder,
};
