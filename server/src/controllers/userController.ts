import { Request, Response, NextFunction } from "express";
import ApiError from "../error/apiError";
import bcrypt, { hash } from 'bcrypt';
import jwt from 'jsonwebtoken';
import {JwtUser, TelegramUser, User, UserCreationAttributes} from '../database/models'
import { AuthorizationType, Role } from "../database/types";
import { Op } from "sequelize";
import ApiResponse from "../response/apiResponse";

interface LoginRegistration {
  username?: string;
  password?: string;
  telegramUsername?: string;
}


const generateJwt = (id: number, username: string, authorizationType: AuthorizationType, TelegramUserId : number, role: Role) => {
  return jwt.sign(
    { id, username, authorizationType, TelegramUserId, role },
    process.env.SECRET_KEY as string,
    { expiresIn: '7d' }
  )
}


export default new class UserController {
  async registration (req: Request, res: Response, next: NextFunction){
    await registration(req, res, next);
  }
  async edit (req: Request, res: Response, next: NextFunction){
    await edit(req, res, next);
  }
  async login (req: Request, res: Response, next: NextFunction){
    await login(req, res, next)
  } 
  async check (req: Request, res: Response, next: NextFunction){
    const {id, username, authorizationType, TelegramUserId, role} = req.currentUser as JwtUser;
    const token = generateJwt(id, username, authorizationType, TelegramUserId, role)

    return res.status(200).json({token})
  }
}



async function registration (req: Request, res: Response, next: NextFunction){
  try{
    const { username, password, telegramUsername } : LoginRegistration = req.body;

    if (! (username && password && telegramUsername)){
      return next(ApiError.badRequest(`required parameter is missing`))
    }
    
    const tgUser = await TelegramUser.findOne({
      where: {
        telegramUsername: { [Op.iLike]: telegramUsername }
      }
    })

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

    const hash = await bcrypt.hash(password, 10);
    const user = await User.create({username, password: hash, TelegramUserId: tgUser.id} as UserCreationAttributes);
    const token = generateJwt(user.id, username, user.authorizationType, user.TelegramUserId, tgUser.role)
  
    return res.status(200).json({token})
  }
  catch(e){
    console.error(e);
    next(ApiError.internal())
  }
}



async function edit(req: Request, res: Response, next: NextFunction){
  const { id: userId, username: currentUsername } = req.currentUser as JwtUser;
    
  interface UpdateUser {
    newUsername: string;
    oldPassword: string;
    newPassword: string;
  }

  const { newUsername, oldPassword, newPassword } = req.body;
  
  try{
    if (! userId || ! (newUsername || ( oldPassword && newPassword ))){
      return next(ApiError.badRequest())
    }

    const user = await User.findOne({
      where: { id: userId }
    });

    if (! user){
      return next(ApiError.notFound('USER WITH SUCH ID WAS NOT FOUND'))
    }
  
    if (newUsername && newUsername !== currentUsername){
      const checkUsername = await User.findOne({ where: { username: newUsername } });
      if (checkUsername) {
        return next(ApiError.conflict('THIS USERNAME IS ALREADY EXISTS'))
      }
      user.username = newUsername;
    }
    if ( oldPassword || newPassword ){
      if (! (oldPassword && newPassword)) {
        return next(ApiError.badRequest())
      } 

      const comparePassword = bcrypt.compareSync(oldPassword, user.password);
      
      if (! comparePassword){
        return next(ApiError.badRequest('incorrect password')) //тут бы сделать лог аут
      }

      user.password = await bcrypt.hash(newPassword, 10);
    }

    await user.save()
    new ApiResponse(res).success()
  } catch (e){
    console.error(e)
    next(ApiError.internal()) 
  }
}



async function login(req: Request, res: Response, next: NextFunction) {
  const {username, password} : LoginRegistration = req.body;

  if (! (username && password)){
    return next(ApiError.badRequest(`username/password can't be null!`))
  }
  
  try{
    const user = await User.findOne({
      include: [
        {
          model: TelegramUser,
          attributes: ['role'],
          required: true
        }
      ],
      where: {
        username: { [Op.iLike]: username }
      }
    })
    
    if (! user){
      return next(ApiError.badRequest('user not found'))
    }

    const comparePassword = bcrypt.compareSync(password, user.password);
    
    if (! comparePassword){
      return next(ApiError.badRequest('incorrect password'))
    }
    if (user.TelegramUser?.role === undefined){
      return next(ApiError.internal())
    }

    const token = generateJwt(user.id, username, user.authorizationType, user.TelegramUserId, user.TelegramUser.role);
    return res.status(200).json({token})
  } catch (e) {
    console.error(e)
    next(ApiError.internal()) 
  }
}