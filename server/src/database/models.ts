import { DataTypes, Model, Optional } from "sequelize";
import Database from "./db";
import {
  JwtUser,
  TelegramUserAttributes,
  TelegramCreationAttributes,
  UserAttributes,
  UserCreationAttributes,
  BotAttributes,
  BotCreationAttributes,
  GroupAttributes,
  GroupCreationAttributes,
  OrderAttributes,
  OrderCreationAttributes,
  OrderTypeAttributes,
  OrderTypeCreationAttributes,
  PointAttributes,
  PointCreationAttributes,
  TelegramMessageAttributes,
  TelegramMessageCreationAttributes,
} from './interfaces'
import { OrderStatusType, RoleType } from "./types";


class TelegramUser extends Model<TelegramUserAttributes, UserCreationAttributes> implements TelegramUserAttributes {
  public id!: number;
  public telegramId!: string;
  public telegramUsername!: string;
  public name!: string;
  public role!: RoleType;
  // public TelegramUserId: number;
}

class User extends Model<UserAttributes, UserCreationAttributes> implements UserAttributes {
  public id!: number;
  public username!: string;
  public password!: string;
  public authorizationType!: 'LIMIT' | 'FULL';
  public telegramUserId!: number;
  public telegramUser?: TelegramUser; // for joins
}

class Bot extends Model<BotAttributes, BotCreationAttributes> implements BotAttributes {
  public id!: number;
  public telegramId!: string;
  public token!: string;
  public name!: string;
  public userId!: number;
}

class Group extends Model<GroupAttributes, GroupCreationAttributes> implements GroupAttributes {
  public id!: number;
  public name!: string;
  public telegramId!: string;
  public userId!: number;
}

class Order extends Model<OrderAttributes, OrderCreationAttributes> implements OrderAttributes {
  public id!: number;
  public datetime!: Date;
  public status!: OrderStatusType;
  public groupId!: number;
  public pointId!: number;
  public orderTypeId!: number;
  public telegramMessageId!: number;
  public userId!: number;
}

class OrderType extends Model<OrderTypeAttributes, OrderTypeCreationAttributes> implements OrderTypeAttributes {
  public id!: number;
  public name!: string;
  public groupId!: number;
  public userId!: number;
}

class Point extends Model<PointAttributes, PointCreationAttributes> implements PointAttributes {
  public id!: number;
  public number!: number;
  public telegramUserId?: number;
}

class TelegramMessage extends Model<TelegramMessageAttributes, TelegramMessageCreationAttributes> implements TelegramMessageAttributes {
  public id!: number;
  public message!: JSON;
  public telegramUserId!: number;
}

export {
  TelegramUser,
  TelegramMessage,
  User,
  Bot,
  Group,
  Order,
  OrderType,
  Point,
}
