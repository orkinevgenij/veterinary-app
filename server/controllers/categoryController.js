import asyncHandler from 'express-async-handler';
import categoryModel from '../models/categoryModel.js';
import slug from 'slug';

//create category
const createCategoryController = asyncHandler(async (req, res) => {
  const { name } = req?.body;
  if (!name) {
    throw new Error('Отсуствует категория');
  }

  const category = await categoryModel.create({ name, slug: slug(name) });
  if (category) {
    res.status(200).json(category);
  } else {
    res.status(400);
    throw new Error('Не удалось создать категорию');
  }
});

//get all categories
const getAllCategoryController = asyncHandler(async (req, res) => {
  const category = await categoryModel.find({});
  if (category) {
    res.status(200).json(category);
  } else {
    res.status(400);
    throw new Error('Не удалось получить все категории');
  }
});

//update category
const updateCategoryController = asyncHandler(async (req, res) => {
  const { cid } = req?.params;
  const { name } = req.body;
  const updateCategory = await categoryModel.findByIdAndUpdate(
    { _id: cid },
    { name: name, _id: cid, slug: slug(name) },
    { new: true },
  );
  if (updateCategory) {
    res.status(200).json({
      updateCategory,
    });
  } else {
    res.status(400);
    throw new Error('Не удалось обновить категорию');
  }
});

//remove category
const removeCategoryController = asyncHandler(async (req, res) => {
  const { cid } = req?.params;
  const category = await categoryModel.findByIdAndDelete({ _id: cid });
  if (category) {
    res.status(200).json(category);
  } else {
    res.status(400);
    throw new Error('Не удалось удалить категорию');
  }
});

export {
  createCategoryController,
  getAllCategoryController,
  updateCategoryController,
  removeCategoryController,
};
