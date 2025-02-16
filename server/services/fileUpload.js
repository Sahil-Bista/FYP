import express from "express";
import path from "path";

export const uploadFileSetUpService = (app) => {
  app.use("/uploads", express.static(path.join(process.cwd(), "uploads")));
};

