import Product from '../models/productModel.js';
import categoryModel from '../models/categoryModel.js';

import asyncHandler from 'express-async-handler';
import cloudinary from '../config/cloudinary.js';
import slug from 'slug';
//create  products
const createProductController = asyncHandler(async (req, res) => {
  const { title, description, price, category, image } = req.body;

  const uploadRes = await cloudinary.uploader.upload(image, {
    upload_preset: 'veterinary-shop',
  });
  if (uploadRes) {
    const product = await Product.create({
      title,
      slug: slug(title),
      description,
      price,
      category,
      image: uploadRes,
    });
    if (uploadRes) {
      res.status(201).json(product);
    } else {
      res.status(404);
      throw new Error('Не удалось загрузить изображение');
    }
  }
});
//get all products
const getProductController = asyncHandler(async (req, res) => {
  const products = await Product.find({}).sort({ price: 1 }).populate('category');
  if (products) {
    res.status(201).json(products);
  } else {
    res.status(404);
    throw new Error('Не удалось загрузить товары');
  }
});
//get products by category
const getProductsByCategoryController = asyncHandler(async (req, res) => {
  const { slug } = req?.params;
  const { sortBy } = req?.query;
  //Вопрос с сортировкой в отдельных категориях sortBy
  const category = await categoryModel.find({ slug });
  const products = await Product.find({ category }).sort({ price: sortBy }).populate('category');
  if (products) {
    res.status(200).json(products);
  } else {
    res.status(404);
    throw new Error('Не удалось получить товар');
  }
});

//get product details by slug
const getProductDetailsController = asyncHandler(async (req, res) => {
  console.log(req?.params.slug);
  const product = await Product.findOne({ slug: req?.params.slug });
  if (product) {
    res.status(201).json(product);
  } else {
    res.status(404);
    throw new Error('Не удалось получить товар');
  }
});
//Доделать обновление товара
const updateProductController = asyncHandler(async (req, res) => {
  const { pid } = req?.params;
  const { title, price, description, category, image, _id } = req?.body;
  const product = await Product.findById(pid);
  let uploadRes;
  if (image) {
    uploadRes = await cloudinary.uploader.upload(image, {
      upload_preset: 'veterinary-shop',
    });
    await cloudinary.uploader.destroy(product?.image.public_id);
  }
  const updateProduct = await Product.findByIdAndUpdate(
    { _id: pid },
    {
      title,
      price,
      description,
      category,
      slug: slug(title),
      _id,
      image: uploadRes || product?.image,
    },
    { new: true },
  );
  if (updateProduct) {
    res.json(updateProduct);
  } else {
    res.status(500);
    throw new Error('Не удалось обновить товар');
  }
});
//delete product
const deleteProductsController = asyncHandler(async (req, res) => {
  const { pid } = req?.params;
  const product = await Product.findByIdAndDelete(pid);

  if (product) {
    await cloudinary.uploader.destroy(product.image.public_id);
    res.status(200).json(product);
  } else {
    res.status(500);
    throw new Error('Не удалось удалить товар');
  }
});

const productFilterController = asyncHandler(async (req, res) => {
  const { sortBy } = req.query;
  const { checked, priceFrom, priceUp } = req.body;
  console.log('req.body:', checked, priceFrom, priceUp);
  let args = {};
  if (checked.length > 0) args.category = checked;
  if (priceFrom || priceUp) args.price = { $gte: priceFrom, $lte: priceUp };
  console.log(args);
  const filteredProducts = await Product.find(args).sort({ price: sortBy }).populate('category');
  if (filteredProducts) {
    res.status(200).json(filteredProducts);
  } else {
    res.status(500);
    throw new Error('Не удалось получить товар');
  }
});

const searchProductController = asyncHandler(async (req, res) => {
  const { keyword } = req.params;
  const product = await Product.find({
    $or: [
      { name: { $regex: keyword, $options: 'i' } },
      { description: { $regex: keyword, $options: 'i' } },
    ],
  });
  if (product) {
    res.status(201).json(product);
  } else {
    res.status(404);
    throw new Error('Не удалось получить товар');
  }
});
const relatedProductController = asyncHandler(async (req, res) => {
  const { pid, cid } = req?.params;
  const products = await Product.find({
    category: cid,
    _id: {
      $ne: pid,
    },
  })
    .select('-photo')
    .limit(5)
    .populate('category');
  if (products) {
    res.status(200).json(products);
  } else {
    res.status(400);
    throw new Error('Не удалось получить товар');
  }
});
export {
  createProductController,
  getProductController,
  getProductsByCategoryController,
  getProductDetailsController,
  updateProductController,
  deleteProductsController,
  productFilterController,
  searchProductController,
  relatedProductController,
};
