import { Request, Response, NextFunction } from "express";
import ApiError from "../error/apiError";
import { JwtUser, Bot } from "../database/models";
import LightTelegramApi from "../telegramBotAPI";
import apiResponse from "../response/apiResponse";

export default new class BotController {
  async create(req: Request, res: Response, next: NextFunction){
    const { id: UserId } = req.currentUser as JwtUser
    const { botToken } : { botToken :  string | undefined } = req.body;
     
    if (! (botToken)){
      return next(ApiError.badRequest('required pararameter "botToken" does not exist'))
    }

    const checkBot = await new LightTelegramApi(botToken).getMe(true);

    if ( checkBot.ok ){
      if (! checkBot.result?.id){
        return next(ApiError.badRequest())
      }

      const bot = await Bot.create({ telegramId: checkBot.result.id.toString() as string, token: botToken, UserId})
      return new apiResponse(res).success(bot)
    }
    
    res.status(checkBot.error_code ?? 409).json(checkBot)
  } 
  async getList (req: Request, res: Response, next: NextFunction) {
    const { id: UserId } = req.currentUser as JwtUser;
    
    const botList = await Bot.findAll({ where: { UserId } });
    new apiResponse(res).success(botList)
  }
  async delete(req: Request, res: Response, next: NextFunction){
    const { id: UserId } = req.currentUser as JwtUser;
    const { botId } = req.body;

    if (! botId){
      return next(ApiError.badRequest())
    }

    const deleteStatus = await Bot.destroy( {
      where: {
        UserId,
        id: botId    
      }
    })

    if (deleteStatus === 1){
      return new apiResponse(res).success({message : 'Deleted successfully'});
    } else if (deleteStatus === 0){
      return next(ApiError.badRequest('BOT WITH SUCH ID DOES NOT EXIST'))
    }
  }
}


