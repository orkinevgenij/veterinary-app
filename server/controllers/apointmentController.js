import asyncHandler from 'express-async-handler';
import Apointment from '../models/doctorApointment.js';
const getAllApointments = asyncHandler(async (req, res) => {
  const { page } = req?.query;
  const apointments = await Apointment.paginate(
    {},
    {
      limit: 10,
      page: Number(page),
      sort: { createdAt: -1 },
    },
  );

  const successApointments = await Apointment.paginate(
    { status: true },
    {
      limit: 10,
      page: Number(page),
      sort: { createdAt: -1 },
    },
  );

  if (apointments && successApointments) {
    res.json({ apointments, successApointments });
  } else {
    res.status(401);
    throw new Error('Не удалось получить записи на приём');
  }
});

const getUserApointment = asyncHandler(async (req, res) => {
  const { page } = req?.query;
  const userApointment = await Apointment.paginate(
    { user: req?.user?._id },
    {
      limit: 10,
      page: Number(page),
      sort: { createdAt: -1 },
    },
  );
  if (userApointment) {
    res.json(userApointment);
  } else {
    res.status(401);
    throw new Error('Не удалось получить записи на приём');
  }
});

const createApointment = asyncHandler(async (req, res) => {
  const { name, number, date, animal, description } = req.body;
  const apointment = await Apointment.create({
    name,
    number,
    date,
    animal,
    description,
    user: req?.user?._id,
  });

  if (apointment) {
    res.json(apointment);
  } else {
    res.status(401);
    throw new Error('Не удалось записаться на прием');
  }
});

const updateApointment = asyncHandler(async (req, res) => {
  const { id, prescribing, status } = req.body;
  const apointment = await Apointment.findByIdAndUpdate(id, { prescribing, status }, { new: true });
  if (apointment) {
    res.json(apointment);
  } else {
    res.status(401);
    throw new Error('Не удалось обновить');
  }
});
const removeApointment = asyncHandler(async (req, res) => {
  const { id } = req.body;

  const apointment = await Apointment.findByIdAndDelete(id);
  if (apointment) {
    res.json(apointment);
  } else {
    res.status(401);
    throw new Error('Не удалось удалить');
  }
});
export {
  getAllApointments,
  createApointment,
  removeApointment,
  updateApointment,
  getUserApointment,
};
