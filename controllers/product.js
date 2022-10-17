import Product from "../models/products.js";
import { Techcard } from "../models/techcard.js";

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

export const updateProduct = async (req, res, next) => {
  try {
    const video = await Product.findById(req.params.id);
    if (!video) return next(404, "Not found Product");

    const updatedProduct = await Product.findByIdAndUpdate(
      req.params.id,
      {
        $set: req.body,
      },
      { new: true }
    );
    res.status(200).json(updatedProduct);
  } catch (e) {
    next(e);
  }
};

export const updateProducts = async (req, res, next) => {
  try {
    const bulk = [];
    req.body.products.forEach((item) => {
      let updateDoc = {
        updateOne: {
          filter: { productId: item.productId },
          update: item,
          upsert: false,
        },
      };
      bulk.push(updateDoc);
    });

    await Product.bulkWrite(bulk);

    res.status(200).json(req.body.products);
  } catch (e) {
    next(e);
  }
};

export const deleteProduct = async (req, res, next) => {
  try {
    await Product.findByIdAndDelete(req.params.id);
    res.status(200).json("Successfully deleted");
  } catch (e) {
    next(e);
  }
};

export const findProduct = async (req, res, next) => {
  try {
    await Product.findById(req.body.id);
    res.status(200).json("Successfully find");
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

export const createTechCard = async (req, res, next) => {
  const newTechCard = new Techcard({
    ...req.body,
  });

  try {
    const saveTechCard = await newTechCard.save();
    res.status(200).json(saveTechCard);
  } catch (e) {
    next(e);
  }
};

export const getTechCards = async (req, res, next) => {
  try {
    await Techcard.findById(req.body.id);
    res.status(200).json("Successfully find tech-cards");
  } catch (e) {
    next(e);
  }
};
