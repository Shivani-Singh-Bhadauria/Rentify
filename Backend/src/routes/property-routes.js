import express from "express";
import {
  AddNewProperty,
  GetAllProperties,
  getSingleProperty
} from "../controllers/propertiesControllers.js";
import { verifyToken } from "../utils/token-manager.js";
import multer from 'multer';
import path from 'path';
const propertyRoutes = express.Router();
const storage = multer.diskStorage({
  destination: 'uploads/', 
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname));
  },
});
const upload = multer({ storage });

propertyRoutes.post("/add",verifyToken,upload.single('image'), AddNewProperty);
propertyRoutes.get("/getall",verifyToken,GetAllProperties);
propertyRoutes.get("/single/:id",verifyToken,getSingleProperty);


export default propertyRoutes;