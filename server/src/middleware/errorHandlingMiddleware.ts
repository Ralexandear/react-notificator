import ApiError from "../error/apiError";
import { Request, Response, NextFunction } from "express";

export default function errorHandlingMiddleware(err: Error | ApiError, req : Request, res : Response, next: NextFunction){
  if (err instanceof ApiError){
    return res.status(err.status).json({message: err.message})
  }
  return res.status(500).json({message: 'Unexpected error'})

}