import { NextFunction, Request, Response } from "express";
import { Bot, Group } from "../database/models";
import ApiError from "../error/apiError";
import ApiResponse from "../response/apiResponse";
import { GroupAttributes, JwtUser } from "../database/interfaces";


export default new class GroupController {
  async create(req: Request, res: Response, next: NextFunction){
    const { id: userId } = req.currentUser as JwtUser;
    const { telegramId, name} : GroupAttributes = req.body;
    
    if (! (telegramId && name)){
      return next(ApiError.badRequest())
    }

    try{

      const [group, created] = await Group.findOrCreate({
        where: {
          telegramId,
          userId
        },
        defaults: {
          telegramId,
          userId,
          name
        }
      });
    
      if (! created){
        return next(ApiError.badRequest(`This group is already exists, group name ${group.name}`))
      };

      new ApiResponse(res).success(group)
    } catch (e) {
      console.error(e)
      next(ApiError.internal())
    }
  }
  async list(req: Request, res: Response, next: NextFunction){
    const { id: userId } = req.currentUser as JwtUser;
    
    try{
      const groupList = await Group.findAll({ where: { userId } });
      new ApiResponse(res).success(groupList)
    } catch (e) {
      console.error(e)
      next(ApiError.internal())
    }
  }
  async edit(req: Request, res: Response, next: NextFunction){
    const { id: userId } = req.currentUser as JwtUser;
    const { id , name, telegramId } : GroupAttributes = req.body;

    if (! (id && name && telegramId)){
      return next(ApiError.badRequest(`ONE OF REQUIRED PARAMETER IS MISSING, CHECK PARAMETERS: 'id', 'name', 'telegramId'`))
    }

    try{
      const result = (await Group.update({name, telegramId}, {
        where: {
          userId,
          id
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
    const { id: userId } = req.currentUser as JwtUser;
    const { id } : GroupAttributes = req.body; // groupId

    if (! id){
      return next(ApiError.badRequest())
    }

    try{
      const result = await Bot.destroy( {
        where: {
          userId,
          id    
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