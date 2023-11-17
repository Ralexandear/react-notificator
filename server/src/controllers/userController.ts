import { Request, Response, NextFunction } from "express";
import ApiError from "../error/apiError";
import bcrypt, { hash } from 'bcrypt';
import {TelegramUser, User, UserCreationAttributes} from '../database/models'

export default new class UserController {
  async registration (req: Request, res: Response, next: NextFunction){
    await registration(req, res, next);
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



async function registration (req: Request, res: Response, next: NextFunction){
  interface RequestBody {
    username?: string;
    password?: string;
    telegramUsername?: string;
  }

  const { username, password, telegramUsername } : RequestBody = req.body;

  if (! (username && password && telegramUsername)){
    return next(ApiError.badRequest(`required parameter is missing`))
  }
  
  const tgUser = await TelegramUser.findOne({where: {telegramUsername}})

  if (! tgUser){
    return next(ApiError.badRequest('unknown username'))
  }
  else if (! tgUser.role.includes('ADMIN')){
    return next(ApiError.forbidden())
  }
  
  const checkUser = await User.findOne({
    include: {
      model: TelegramUser,
      where: {
        id: tgUser.id
      },
    },
  })

  if (checkUser){
    return next(ApiError.conflict('user is already exist'))
  }

  const hash = await bcrypt.hash(password, 10)
  // const newUser = await User.create({username, password: hash, TelegramUserId: tgUser.id} as UserCreationAttributes)

  // console.log(newUser)
  // return res.status(200).json(newUser)
  // Аргумент типа "{ username: string; password: string; }" нельзя назначить параметру типа "Optional<UserCreationAttributes, "id">".
  // В типе "{ username: string; password: string; }" отсутствуют следующие свойства из типа "Omit<UserCreationAttributes, "id">": telegramId, telegramUsername, name, role, authorizationTypets(2345)

  
  console.log(checkUser)
  // const user = await User.create({name})
  // return res.status(200).json(user)
}