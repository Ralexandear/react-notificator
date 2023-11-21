import { Request, Response, NextFunction } from "express";
import ApiError from "../error/apiError";
import { JwtUser, Bot } from "../database/models";
import LightTelegramApi from "../telegramBotAPI/telegramBotApi";
import ApiResponse from "../response/apiResponse";

export default new class BotController {
  async create(req: Request, res: Response, next: NextFunction){
    const { id: UserId } = req.currentUser as JwtUser
    const { token: botToken } : { token :  string | undefined } = req.body;
     
    if (! (botToken)){
      return next(ApiError.badRequest('required pararameter "botToken" does not exist'))
    }

    try{
      const checkBot = await new LightTelegramApi(botToken).getMe(true);

      if ( checkBot.ok ){
        if (! checkBot.result?.id){
          return next(ApiError.badRequest())
        }

        const bot = await Bot.create({
          telegramId: checkBot.result.id.toString(),
          token: botToken,
          name: checkBot.result.first_name,
          UserId,
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
    const { id: UserId } = req.currentUser as JwtUser;

    try{
      const botList = await Bot.findAll({ where: { UserId } });
      new ApiResponse(res).success(botList)
    } catch (e) {
      console.error(e)
      next(ApiError.internal())
    }
  }
  async delete(req: Request, res: Response, next: NextFunction){
    const { id: UserId } = req.currentUser as JwtUser;
    const { id: botId } = req.body;

    if (! botId){
      return next(ApiError.badRequest())
    }

    try{
      const deleteStatus = await Bot.destroy( {
        where: {
          UserId,
          id: botId    
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


