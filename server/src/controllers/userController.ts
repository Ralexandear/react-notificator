import { Request, Response, NextFunction } from "express";
import ApiError from "../error/apiError";
import bcrypt from 'bcrypt';
import {User} from '../database/models'

class UserController {
  async registration (req: Request, res: Response, next: NextFunction){
    const {name} = req.body;

    console.log(name)
    console.log(req.body)

    if (! name){
      return next(ApiError.badRequest(`required parameter 'name' is missing`))
    }
    const user = await User.create({name})
    return res.status(200).json(user)
  }
  async login (req: Request, res: Response){

  }
  async check (req: Request, res: Response, next: NextFunction){
    const {id} = req.query;

    if (! id){
      return next(ApiError.badRequest('id param was not set'))
    }
  }
}

export default new UserController()