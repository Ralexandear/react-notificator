import { Request, Response, NextFunction } from "express";
import ApiError from "../error/apiError";
import { JwtUser, OrderType } from "../database/models"
import ApiResponse from "../response/apiResponse";


interface OrderTypeBody {
  id: number;
  name: string;
  groupId: number;
}


export default new class OrderTypeController {
  async create(req: Request, res: Response, next: NextFunction){
    const { id: UserId } = req.currentUser as JwtUser;
    const { name, groupId } : OrderTypeBody = req.body;

    if (! (name && groupId)){
      return next(ApiError.badRequest());
    }

    try{
      const [user, created] = await OrderType.findOrCreate({
        where: {
          UserId,
          GroupId: groupId
        },
        defaults: {
          name,
          UserId,
          GroupId: groupId
        }
      });
  
      if (created){
        return new ApiResponse(res).success(user);
      }
      next(ApiError.badRequest('ORDER TYPE ALREADY EXIST'))
    } catch (e) {
      console.error(e)
      next(ApiError.internal())
    }    
  }
  async list(req: Request, res: Response, next: NextFunction){
    const { id: UserId } = req.currentUser as JwtUser;
    
    try{
      const orderTypeList = await OrderType.findAll({ where: { UserId } });
      new ApiResponse(res).success(orderTypeList)
    } catch (e) {
      console.error(e)
      next(ApiError.internal())
    }    
  }
  async edit(req: Request, res: Response, next: NextFunction){
    const { id: UserId } = req.currentUser as JwtUser;
    const { id: orderTypeId, groupId, name } : OrderTypeBody = req.body;

    if (! (groupId && name )){
      return next(ApiError.badRequest(`ONE OF REQUIRED PARAMETER IS MISSING, CHECK PARAMETERS: 'id', 'name'`))
    }

    try{
      const result = (await OrderType.update( { name, GroupId: groupId }, {
        where: {
          UserId,
          id: orderTypeId
        },
        limit: 1
      }))[0];
      
      if (result === 1){
        return new ApiResponse(res).success()
      }
      next(ApiError.badRequest()) // здесь бы написать обновление страницы или типа того
    } catch (e){
      console.error(e)
      next(ApiError.badRequest()) 
    }
    
  }
  async delete(req: Request, res: Response, next: NextFunction){
    const { id: UserId } = req.currentUser as JwtUser;
    const { id: orderTypeId } : OrderTypeBody = req.body;

    if (! orderTypeId){
      return next(ApiError.badRequest())
    }

    try{
      const result = await OrderType.destroy( {
        where: {
          UserId,
          id: orderTypeId    
        }
      })

      if (result === 1){
        return new ApiResponse(res).success('Deleted successfully');
      } else if (result === 0){
        return next(ApiError.badRequest('GROUP WITH SUCH ID DOES NOT EXIST'))
      }
    } catch (e){
      console.error(e)
      next(ApiError.badRequest()) 
    }
  }
}