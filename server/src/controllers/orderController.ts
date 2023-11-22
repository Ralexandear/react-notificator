import { NextFunction, Request, Response } from "express";
import { Order, OrderType } from "../database/models";
import { date } from "tdlib-types";
import ApiError from "../error/apiError";
import LightTelegramApi from "../telegramBotAPI/telegramBotApi";
import { JwtUser, OrderAttributes } from "../database/interfaces";


class OrderController {
  async create(req: Request, res: Response, next: NextFunction){
    // const { id: UserId } = req.currentUser as JwtUser
    // const { datetime, groupId: GroupId, OrderTypeId, PointId, TelegramMessageId } : OrderAttributes = req.body;
     
    // if (! (datetime && groupId && orderTypeId && pointId && telegramMessageId)){
    //   return next(ApiError.badRequest())
    // }

    // try{
    //   const order = await Order.create({
    //     datetime,
    //     GroupId: groupId,
    //     OrderTypeId: orderTypeId,
    //     PointId: pointId,
    //     TelegramMessageId: telegramMessageId
    //   })

    //   if ( checkBot.ok ){
    //     if (! checkBot.result?.id){
    //       return next(ApiError.badRequest())
    //     }

    //     const bot = await Bot.create({
    //       telegramId: checkBot.result.id.toString(),
    //       token: botToken,
    //       name: checkBot.result.first_name,
    //       UserId,
    //     })

    //     return new ApiResponse(res).success(bot)
    //   }
      
    //   res.status(checkBot.error_code ?? 409).json(checkBot)
    // } catch (e) {
    //   console.error(e)
    //   next(ApiError.internal())
    // }
  }
  async getAll(req: Request, res: Response, next: NextFunction){

  }
  async edit(req: Request, res: Response, next: NextFunction){

  }
}

export default new OrderController()