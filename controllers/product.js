import Product from "../models/products.js";

export const createProduct = async (req, res, next) => {
  const newProduct = new Product({
    ...req.body,
  });

  try {
    const saveProduct = await newProduct.save();
    res.status(200).json(saveProduct);
  } catch (e) {
    next(e);
  }
};

export const deleteProduct = async (req, res, next) => {
  try {
    await Product.findByIdAndDelete(req.params.id);
    res.status(200).json("Succeffully deleted");
  } catch (e) {
    next(e);
  }
};

export const getAllProducts = async (req, res, next) => {
  try {
    let products = await Product.find().sort({ createdAt: -1 });
    res.status(200).json(products);
  } catch (err) {
    next(err);
  }
};
