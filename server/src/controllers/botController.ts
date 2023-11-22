import { Request, Response, NextFunction } from "express";
import ApiError from "../error/apiError";
import { Bot } from "../database/models";
import LightTelegramApi from "../telegramBotAPI/telegramBotApi";
import ApiResponse from "../response/apiResponse";
import { BotAttributes, JwtUser } from "../database/interfaces";

export default new class BotController {
  async create(req: Request, res: Response, next: NextFunction){
    const { id: userId } = req.currentUser as JwtUser
    const { token } : BotAttributes = req.body;
     
    if (! (token)){
      return next(ApiError.badRequest('required pararameter "token" does not exist'))
    }

    try{
      const checkBot = await new LightTelegramApi(token).getMe(true);

      if ( checkBot.ok ){
        if (! checkBot.result?.id){
          return next(ApiError.badRequest())
        }

        const bot = await Bot.create({
          telegramId: checkBot.result.id.toString(),
          token,
          name: checkBot.result.first_name,
          userId,
        })

        return new ApiResponse(res).success(bot)
      }
      
      res.status(checkBot.error_code ?? 409).json(checkBot)
    } catch (e) {
      console.error(e)
      next(ApiError.internal())
    }
  }
  async list (req: Request, res: Response, next: NextFunction) {
    const { id: userId } = req.currentUser as JwtUser;

    try{
      const botList = await Bot.findAll({ where: { userId } });
      new ApiResponse(res).success(botList)
    } catch (e) {
      console.error(e)
      next(ApiError.internal())
    }
  }
  async delete(req: Request, res: Response, next: NextFunction){
    const { id: userId } = req.currentUser as JwtUser;
    const { id } = req.body; // botId

    if (! id){
      return next(ApiError.badRequest())
    }

    try{
      const deleteStatus = await Bot.destroy( {
        where: {
          userId,
          id    
        }
      })

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


