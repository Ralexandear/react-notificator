import { Request, Response, NextFunction } from "express";
import ApiError from "../error/apiError";
import { OrderType } from "../database/models"

class OrderTypeController {
  async create(req: Request, res: Response, next: NextFunction){
    const {name} = req.body;

    if (! (name)){
      return next(ApiError.badRequest('order type name was not provided!'));
    }

    const orderType = await OrderType.create({ name });

  }
  async getAll(req: Request, res: Response, next: NextFunction){

  }
  async edit(req: Request, res: Response, next: NextFunction){

  }
  async delete(req: Request, res: Response, next: NextFunction){

  }
}

export default new OrderTypeController()