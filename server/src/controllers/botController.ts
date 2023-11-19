import { Request, Response, NextFunction } from "express";
import ApiError from "../error/apiError";
import { JwtUser, Bot } from "../database/models";
import LightTelegramApi from "../telegramBotAPI";

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
      return res.status(200).json(bot)
    }
    
    res.status(checkBot.error_code ?? 409).json(checkBot)
  } 
  async getList (req: Request, res: Response, next: NextFunction) {
    const { id: UserId } = req.currentUser as JwtUser;
    
    const botList = await Bot.findAll({ where: { UserId } });
    res.status(200).json(botList)
  }
  async delete(req: Request, res: Response, next: NextFunction){
    const { id: UserId } = req.currentUser as JwtUser;
    const { botId } = req.body;

    if (! botId){
      return next(ApiError.badRequest())
    }

    // return bot.destroy({
    //   where: {
    //     UserId,
    //     id: botId
    //   }
    // }).then()

    const bot = await Bot.findOne()

    if (! bot){
      return next(ApiError.badRequest())
    }

    

  }
}


