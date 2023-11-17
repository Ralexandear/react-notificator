import { Request, Response, NextFunction } from "express";
import ApiError from "../error/apiError";

class BotController {
  async create(req: Request, res: Response, next: NextFunction){
    const {user_id, token} = req.body;
    
    if (! (user_id && token)){
      return next(ApiError.badRequest('user_id and/or bot token was not provided'))
    }


  }
  async getAll(req: Request, res: Response){

  }
  async delete(req: Request, res: Response){

  }
}

export default new BotController()