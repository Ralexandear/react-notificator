import { NextFunction, Request, Response } from "express";
import ApiError from "../error/apiError";
import { Point } from "../database/models";
import ApiResponse from "../response/apiResponse";

interface PointBody {
  id: number;
  number: number;
  telegramuserId: number;
}
class PointController {
  async create(req: Request, res: Response, next: NextFunction){
    // const { id: userId } = req.currentUser as JwtUser;
    const { number } : PointBody = req.body;
    
    if (! number){
      return next(ApiError.badRequest())
    }

    try{
      const [point, isCreated] = await Point.findOrCreate({
        where: { number },
        defaults: { number }
      });
    
      if (! isCreated){
        return next(ApiError.badRequest(`This point is already exists`))
      };

      new ApiResponse(res).success(point)
    } catch (e) {
      console.error(e)
      next(ApiError.internal())
    }
  }
  async delete(req: Request, res: Response, next: NextFunction){
    const { id: pointId } = req.body;

    if (! pointId){
      return next(ApiError.badRequest())
    }

    try{
      const deleteStatus = await Point.destroy( { where: { id: pointId } })

      if (deleteStatus === 1){
        return new ApiResponse(res).success({message : 'Deleted successfully'});
      } else if (deleteStatus === 0){
        return next(ApiError.badRequest('BOT WITH SUCH ID DOES NOT EXIST'))
      }
    } catch (e) {
      console.error(e)
      next(ApiError.internal())
    }
  }
}

export default new PointController()