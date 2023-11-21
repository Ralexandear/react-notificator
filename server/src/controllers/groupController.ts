import { NextFunction, Request, Response } from "express";
import { Bot, Group, JwtUser } from "../database/models";
import ApiError from "../error/apiError";
import ApiResponse from "../response/apiResponse";

interface GroupBody {
  id : string,
  name: string,
  telegramId: string
} 

export default new class GroupController {
  async create(req: Request, res: Response, next: NextFunction){
    const { id: UserId } = req.currentUser as JwtUser;
    const { id: groupId, name} : GroupBody = req.body;
    
    if (! (groupId && name)){
      return next(ApiError.badRequest())
    }

    try{
      const checkGroup = await Group.findOne( { where: { telegramId: groupId, UserId } });
    
      if (checkGroup){
        return next(ApiError.badRequest(`This group is already exists, group name ${checkGroup.name}`))
      };

      const group = await Group.create({telegramId: groupId, name, UserId});
      new ApiResponse(res).success(group)
    } catch (e) {
      console.error(e)
      next(ApiError.internal())
    }
  }
  async list(req: Request, res: Response, next: NextFunction){
    const { id: UserId } = req.currentUser as JwtUser;
    
    try{
      const groupList = await Group.findAll({ where: { UserId } });
      new ApiResponse(res).success(groupList)
    } catch (e) {
      console.error(e)
      next(ApiError.internal())
    }
  }
  async edit(req: Request, res: Response, next: NextFunction){
    const { id: UserId } = req.currentUser as JwtUser;
    const { id: groupId, name, telegramId } : GroupBody = req.body;

    if (! (groupId && name && telegramId)){
      return next(ApiError.badRequest(`ONE OF REQUIRED PARAMETER IS MISSING, CHECK PARAMETERS: 'id', 'name', 'telegramId'`))
    }

    try{
      const result = (await Group.update({name, telegramId}, {
        where: {
          UserId,
          id: groupId
        },
        limit: 1
      }))[0];
      
      if (result === 1){
        return new ApiResponse(res).success()
      }
      next(ApiError.badRequest()) // здесь бы написать обновление страницы или типа того
    } catch (e) {
      console.error(e)
      next(ApiError.internal())
    }
  }
  async delete(req: Request, res: Response, next: NextFunction){
    const { id: UserId } = req.currentUser as JwtUser;
    const { id: groupId } : GroupBody = req.body;

    if (! groupId){
      return next(ApiError.badRequest())
    }

    try{
      const result = await Bot.destroy( {
        where: {
          UserId,
          id: groupId    
        }
      })

      if (result === 1){
        return new ApiResponse(res).success('Deleted successfully');
      } else if (result === 0){
        return next(ApiError.badRequest('GROUP WITH SUCH ID DOES NOT EXIST'))
      }
    } catch (e) {
      console.error(e)
      next(ApiError.internal())
    }
  }
}