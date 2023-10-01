import asyncHandler from 'express-async-handler';
import orderModel from '../models/orderModel.js';
//create order
const createOrderController = asyncHandler(async (req, res) => {
  const { cartItems } = req.body;
  console.log('🚀 ~ createOrderController ~ cartItem:', cartItems);
  const order = new orderModel({
    products: cartItems,
    buyer: req?.user?._id,
  }).save();
  if (order) {
    res.json(order);
  } else {
    res.status(400);
    throw new Error('Не удалось создать заказ');
  }
});

//get user orders
const getUserOrderController = asyncHandler(async (req, res) => {
  const order = await orderModel
    .find({
      buyer: req?.user?._id,
    })
    .populate('buyer');
  if (order) {
    res.status(200).json(order);
  } else {
    res.status(400);
    throw new Error('Не удалось получить пользовательские заказы');
  }
});
//get user all orders

const getAllUserOrderController = asyncHandler(async (req, res) => {
  const order = await orderModel.find({}).populate('buyer');
  if (order) {
    res.status(200).json(order).populate('buyer');
  } else {
    res.status(400);
    throw new Error('Не удалось получить пользовательские заказы');
  }
});

export { createOrderController, getUserOrderController, getAllUserOrderController };
