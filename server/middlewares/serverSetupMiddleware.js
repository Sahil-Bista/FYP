import cors from "cors";
import express from "express";
import cookieParser from "cookie-parser";

export const serverSetupMiddlewares = (app) => {
  app.use(
    cors({
      origin: "http://localhost:5173",
      credentials: true,
    })
  );
  app.use(express.json());
  app.use(cookieParser());
};


