import express from "express";
import { fileURLToPath } from "url";
import path from "path";

export const uploadFileSetUpService = (app) => {
  const __filename = fileURLToPath(import.meta.url);
  //so it returns path like server/index.js
  const __dirname = path.dirname(__filename);
  // this returns only upto server and then it is attached to uploads
  
  app.use("/uploads", express.static(path.join(__dirname, "uploads")));
  //This basically helps in serving the file to the frontend
};

