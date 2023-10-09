import asyncHandler from 'express-async-handler';
import generateToken from '../utils/generateToken.js';
import User from '../models/userModel.js';
import Apointment from '../models/doctorApointment.js';

//Auth user

const authUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });

  if (user && (await user.isPasswordMatch(password))) {
    res.json({
      _id: user._id,
      name: user.name,
      email: user.email,
      isAdmin: user.isAdmin,
      token: generateToken(user._id),
    });
  } else {
    res.status(401);
    throw new Error('Неправильный логин или пароль');
  }
});

//Register a new user
const registerUser = asyncHandler(async (req, res) => {
  const { name, email, number, password } = req.body;

  const userExists = await User.findOne({ email });

  if (userExists) {
    res.status(400);
    throw new Error('Пользователь уже существует');
  }
  const user = await User.create({
    name,
    email,
    number,
    password,
  });

  if (user) {
    res.status(201).json({
      _id: user._id,
      name: user.name,
      number: user.number,
      email: user.email,
      token: generateToken(user._id),
    });
  } else {
    res.status(400);
    throw new Error('Неправильные пользовательские данные');
  }
});

//Get all user
const getAllUsers = asyncHandler(async (req, res) => {
  const { page } = req?.query;
  const users = await User.paginate(
    {},
    {
      limit: 10,
      page: Number(page),
      sort: { createdAt: -1 },
      populate: 'apointment',
    },
  );

  res.json(users);
});

//Get user profile
const getUserProfile = asyncHandler(async (req, res) => {
  const user = await User.findById(req?.user?._id).populate({
    path: 'apointment',
    options: { sort: { createdAt: -1 } },
  });
  if (user) {
    res.status(200).json(user);
  } else {
    res.status(404);
    throw new Error('Profile not found');
  }
});

//Update user profile
const updateUserProfile = asyncHandler(async (req, res) => {
  const user = await User.findByIdAndUpdate(req?.user?._id);
  if (user) {
    user.name = req.body.name || user.name;
    user.email = req.body.email || user.email;
    user.number = req.body.number || user.number;

    if (req.body.password) {
      user.password = req.body.password;
    }

    const updatedUser = await user.save();

    res.status(200).json({
      _id: updatedUser._id,
      name: updatedUser.name,
      email: updatedUser.email,
      number: updatedUser.number,
    });
  } else {
    res.status(404);
    throw new Error('User not found');
  }
});

//Update user profile

const createUser = asyncHandler(async (req, res) => {
  const { name, email, number, password, userStatus } = req.body;

  const userExists = await User.findOne({ email });

  if (userExists) {
    res.status(400);
    throw new Error('User already exists');
  }

  const user = await User.create({
    name,
    email,
    number,
    userStatus,
    password,
    isAdmin: userStatus,
  });

  if (user) {
    res.status(201).json({
      _id: user._id,
      name: user.name,
      number: user.number,
      email: user.email,
      isAdmin: user.userStatus,
    });
  } else {
    res.status(400);
    throw new Error('Invalid user data');
  }
});

//user apointments
const getUserDetails = asyncHandler(async (req, res) => {
  const apointments = await Apointment.find({
    user: req?.params?.userId,
  }).populate('user');

  if (apointments) {
    res.status(201).json(apointments);
  } else {
    res.status(500);
    throw new Error('User Not Found');
  }
});
export {
  authUser,
  registerUser,
  getUserProfile,
  updateUserProfile,
  getAllUsers,
  createUser,
  getUserDetails,
};
