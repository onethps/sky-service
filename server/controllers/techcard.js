import { Techcard } from "../models/techcard.js";

export const getTechCards = async (req, res, next) => {
  try {
    await Techcard.findById(req.params.productId);
    res.status(200).json("Successfully find tech-cards");
  } catch (e) {
    next(e);
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
