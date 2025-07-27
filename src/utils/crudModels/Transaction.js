import Transaction from "@/models/transaction";
import mongoose from "mongoose";

// گرفتن همه تراکنش‌ها
const getAllTransactions = async () => {
  return await Transaction.find({});
};

// گرفتن تراکنش‌ها بر اساس userId
const getTransactionsByUserId = async (userId) => {
  return await Transaction.find({ userId: new mongoose.Types.ObjectId(userId) });
};

// ایجاد تراکنش جدید
const createTransaction = async (transactionData) => {
  const newTransaction = new Transaction(transactionData);
  await newTransaction.save();
  return newTransaction;
};

// به‌روزرسانی تراکنش بر اساس id
const updateTransaction = async (id, updatedData) => {
  const updatedTransaction = await Transaction.findByIdAndUpdate(id, updatedData, { new: true });
  return updatedTransaction; // اگر id نبود null برمی‌گردد
};


const deleteTransaction = async (id) => {
  const deletedTransaction = await Transaction.findByIdAndDelete(id);
  return deletedTransaction; // اگر id نبود null برمی‌گردد
};

export {
  getAllTransactions,
  getTransactionsByUserId,
  createTransaction,
  updateTransaction,
  deleteTransaction,
};
