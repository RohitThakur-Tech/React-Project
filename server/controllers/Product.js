import ProductModel from "../models/Product.js";

export const CreateProduct = async (req, res) => {
  try {
    let images = req?.files?.map((item) => {
      return item.filename;
    });
    const prdData = await ProductModel.create({
      name: req.body.name,
      description: req.body.description,
      quantity: req.body.quantity,
      price: req.body.price,
      active: req.body.active,
      images: images,
      department: req.body.departmentId,
    });
    if (prdData) res.status(201).send({ message: "Product Created" });
    else res.status(401).send({ message: "Unable to create product" });
  } catch (e) {
    res.status(404).send({ error: e?.message });
  }
};

export const UpdateProduct = async (req, res) => {
  try {
    let images = req?.files?.map((item) => {
      return item.filename;
    });
    const prdData = await ProductModel.findByIdAndUpdate(
      {
        _id: req.body.id,
      },
      {
        name: req.body.name,
        description: req.body.description,
        quantity: req.body.quantity,
        price: req.body.price,
        active: req.body.active,
        images: images,
        department: req.body.departmentId,
      }
    );
    if (prdData) res.status(201).send({ message: "Product Updated" });
    else res.status(401).send({ message: "Unable to update product" });
  } catch (e) {
    res.status(404).send({ error: e?.message });
  }
};

export const DeleteProduct = async (req, res) => {
  try {
    const prdData = await ProductModel.deleteOne({
      _id: req.body._id,
    });
    if (prdData.deletedCount == 1)
      res.status(201).send({ message: "Product deleted" });
    else res.status(404).send({ message: "Unable to delete product" });
  } catch (e) {
    res.status(404).send({ error: e?.message });
  }
};

export const ProductDetails = async (req, res) => {
  try {
    const prdData = await ProductModel.findOne({ _id: req.query.id }).populate({
      path: "department",
      populate: [{ path: "university" }],
    });
    res.status(200).send({ prdData });
  } catch (e) {
    res.status(404).send({ error: e?.message });
  }
};

export const GetProductByDepartmentId = async (req, res) => {
  try {
    const prdData = await ProductModel.find({
      department: req.query.departmentId,
    }).populate({
      path: "department",
      populate: [{ path: "university" }],
    });
    res.status(200).send({ prdData });
  } catch {
    res.status(404).send({ error: e?.message });
  }
};

export const UpdateProductQty = async (req, res) => {
  try {
    let product = await ProductModel.findOne({ _id: req.body._id });
    let active = true;
    if (product.quantity - req?.body?.quantity <= 0) {
      active = false;
    }
    let prdData = await ProductModel.findByIdAndUpdate(
      {
        _id: req.body._id,
      },
      {
        quantity: product?.quantity - req.body.quantity,
        active: active,
      }
    );
    if (prdData) res.status(200).send({ message: "Product Updated" });
    else res.status(400).send({ message: "Unable to update product" });
  } catch (e) {
    res.status(404).send({ error: e?.message });
  }
};