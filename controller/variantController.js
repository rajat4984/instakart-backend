import Variant from "../models/Variant.js" 

export const createVariant = async (req, res) => {
  try {
    // const { productId } = req.params;
    const { title, quantity, price, comparePrice, media } = req.body;

    const newVariant = new Variant({
    //   productId,
      title,
      media,
      quantity,
      price,
      comparePrice,
    });

    const savedVariant = await newVariant.save();
    res.status(201).json(savedVariant);
  } catch (error) {
    console.error("Error creating variant:", error);
    res.status(500).json({ error: "Failed to create variant" });
  }
};

export const getAllVariants = async (req, res) => {
  try {
    const { productId } = req.params;
    const variants = await Variant.find({ productId });
    res.json(variants);
  } catch (error) {
    res.status(500).json({ error: "Failed to get variants" });
  }
};

export const getVariantById = async (req, res) => {
  try {
    const { variantId } = req.params;
    const variant = await Variant.findById(variantId);
    if (!variant) {
      return res.status(404).json({ error: "Variant not found" });
    }
    res.json(variant);
  } catch (error) {
    res.status(500).json({ error: "Failed to get variant" });
  }
};

export const updateVariant = async (req, res) => {
  try {
    const { variantId } = req.params;
    const { title, quantity, price, comparePrice, media } = req.body;

    const updatedVariantData = {
      title,
      quantity,
      price,
      comparePrice,
      media,
    };

    const updatedVariant = await Variant.findByIdAndUpdate(
      variantId,
      updatedVariantData,
      { new: true }
    );

    if (!updatedVariant) {
      return res.status(404).json({ error: "Variant not found" });
    }

    res.json(updatedVariant);
  } catch (error) {
    console.error("Error updating variant:", error);
    res.status(500).json({ error: "Failed to update variant" });
  }
};

export const deleteVariant = async (req, res) => {
  try {
    const { variantId } = req.params;
    const deletedVariant = await Variant.findByIdAndDelete(variantId);

    if (!deletedVariant) {
      return res.status(404).json({ error: "Variant not found" });
    }

    res.json({ message: "Variant deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: "Failed to delete variant" });
  }
};