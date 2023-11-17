import { NextFunction, Request, Response } from "express";
import ApiError from "../error/apiError";
import { Contact, DesktopUser, User } from "../database/models";
import bcrypt from 'bcrypt'

class DesktopUserController {
  async create(req: Request, res: Response, next: NextFunction){
    const {username, telegram_username, password} = req.body;

    if (! (username && telegram_username && password)){
      return next(ApiError.badRequest('Incorrect username / telegram_username / password'))
    }

    const {id: user_id} = await Contact.findOne({where: {telegram_username}}) || {};
    if (! user_id) return next(ApiError.badRequest('user with this telegram username was not found'))
    //@ts-ignore
    const candidate = await DesktopUser.findOne({where: {userId: user_id}});

    if (candidate) return next(ApiError.badRequest('user with such username is already exist'));

    const hashPassword = await bcrypt.hash(password, 10);
    return res.status(200).json({message: hashPassword})





  }
  async getAll(req: Request, res: Response, next: NextFunction){

  }
  async edit(req: Request, res: Response, next: NextFunction){

  }
  async delete(req: Request, res: Response, next: NextFunction){

  }
}

export default new DesktopUserController()