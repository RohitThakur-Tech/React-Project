import mongoose from "mongoose";
import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import multer from "multer";
import {
  CreateUniversity,
  DeleteUniversity,
  GetUniversities,
  UpdateUniversity,
} from "./controllers/University.js";
import {
  CreateDepartment,
  DeleteDepartment,
  GetDepartment,
  GetDepartmentsByUniversityId,
  UpdateDepartment,
} from "./controllers/Department.js";
import {
  CreateProduct,
  DeleteProduct,
  GetProductByDepartmentId,
  ProductDetails,
  UpdateProduct,
  UpdateProductQty,
} from "./controllers/Product.js";
import { Login, Register } from "./controllers/User.js";

dotenv.config();

const app = express();
app.use(express.json());
app.use(cors());

const storageUniv = multer.diskStorage({
  destination: "UploadsUniv/",
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}--${file.originalname}`);
  },
});

const UploadsUniv = multer({
  storage: storageUniv,
});

app.post("/university", UploadsUniv.single("image"), CreateUniversity);
app.put("/university", UploadsUniv.single("image"), UpdateUniversity);
app.delete("/university", DeleteUniversity);
app.get("/university", GetUniversities);

const storageDepart = multer.diskStorage({
  destination: "UploadsDepart/",
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}--${file.originalname}`);
  },
});

const UploadsDepart = multer({
  storage: storageDepart,
});

app.post("/department", UploadsDepart.single("image"), CreateDepartment);
app.put("/department", UploadsDepart.single("image"), UpdateDepartment);
app.delete("/department", DeleteDepartment);
app.get("/department", GetDepartmentsByUniversityId);
//app.get("/getDepartmentByUniversityId",GetDepartmentsByUniversityId)

const storageProd = multer.diskStorage({
  destination: "UploadsProd/",
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}--${file.originalname}`);
  },
});

const UploadsProd = multer({
  storage: storageDepart,
});

app.post("/product", UploadsProd.array("images"), CreateProduct);
app.put("/product", UploadsProd.array("images"), UpdateProduct);
app.delete("/product", DeleteProduct);
app.get("/productDetails", ProductDetails);
app.get("/product", GetProductByDepartmentId);
app.put("/updateProductQty", UpdateProductQty);

const storageUser = multer.diskStorage({
  destination: "UploadsUser/",
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}--${file.originalname}`);
  },
});

const UploadsUser = multer({
  storage: storageUser,
});

app.post("/register", UploadsUser.single("profilePic"), Register);
app.post("/login", Login);

//imageAccess

app.use(express.static("UploadsUniv/"));
app.use(express.static("UploadsDepart/"));
app.use(express.static("UploadsProduct/"));
app.use(express.static("/UploadsUser"));

mongoose
  .connect(process.env.DB_URL)
  .then((d) => {
    console.log("Database Connected");
    app.listen(process.env.PORT, () => {
      console.log("Server running at the port:" + process.env.PORT);
    });
  })
  .catch((e) => {
    console.log("Database Connection Failed");
  });
