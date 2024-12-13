import { imageUploadUtil } from "../../helpers/cloudinary/index.js";

import { productAdmin } from "../../models/admin/product.model.js";

const handleImageUpload = async (req, res) => {
  try {
    //Convert to base 64
    const b64 = Buffer.from(req.file.buffer).toString("base64");

    const url = "data:" + req.file.mimetype + ";base64," + b64;

    const result = await imageUploadUtil(url);

    res.json({
      success: true,
      result,
    });
  } catch (error) {
    console.log(error);
    res.json({
      success: false,
      message: "Error Occured",
    });
  }
};

//Add a new product

const addProduct = async (req, res) => {
  try {
    const {
      image,
      title,
      description,
      category,
      brand,
      price,
      salePrice,
      totalStock,
    } = req.body;

    const productSave = await productAdmin.create({
      image,
      title,
      description,
      category,
      brand,
      price,
      salePrice,
      totalStock,
    });

    if (productSave) {
      res.status(201).json({
        success: true,
        data: productSave,
        message: "Product Info Succesfully Saved",
      });
    } else {
      throw new Error("Error Saving Product Details");
    }
  } catch (error) {
    console.log(error);
    res.json({
      success: false,
      message: `Error Occured`,
    });
  }
};
//fetch all product

const fetchAllProducts = async (req, res) => {
  try {
    const documents = await productAdmin.find();
    if (documents) {
      res.status(200).json({
        success: true,
        data: documents,
      });
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      message: `Error Occured`,
    });
  }
};
//edit a product

const editProduct = async (req, res) => {
  try {
    const { id } = req.params;
    const {
      image,
      title,
      description,
      category,
      brand,
      price,
      salePrice,
      totalStock,
    } = req.body;

    let productToUpdate = await productAdmin.findById(id);

    if (!productToUpdate) {
      return res.status(404).json({
        success: false,
        message: "Product not found",
      });
    }

    productToUpdate.title = title || productToUpdate.title;
    productToUpdate.description = description || productToUpdate.description;
    productToUpdate.category = category || productToUpdate.category;
    productToUpdate.brand = brand || productToUpdate.brand;
    productToUpdate.price = price === "" ? 0 : price || productToUpdate.price;
    productToUpdate.salePrice =
      salePrice === "" ? 0 : salePrice || productToUpdate.salePrice;
    productToUpdate.totalStock = totalStock || productToUpdate.totalStock;
    productToUpdate.image_url = image || productToUpdate.image_url;

    await productToUpdate.save();
    res.status(200).json({
      success: true,
      message: `Product updated successfully`,
      data: productToUpdate,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      message: `Error Occured`,
    });
  }
};

//delete a product

const deleteProduct = async (req, res) => {
  try {
    const { id } = req.params;
    const product = await productAdmin.findByIdAndDelete(id);
    console.log(product);

    if (!product) {
      return res.status(404).json({
        success: false,
        message: "Product not found",
      });
    }
    res.status(200).json({
      success: true,
      message: "Product deleted Succesfully",
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      message: "Error Occured",
    });
  }
};
export {
  handleImageUpload,
  addProduct,
  fetchAllProducts,
  editProduct,
  deleteProduct,
};
