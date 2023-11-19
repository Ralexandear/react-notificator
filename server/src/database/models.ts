import { DataTypes, Model, Optional } from "sequelize";
import Database from "./db";
import { Role, AuthorizationType } from "./types";

declare global {
  namespace Express {
    interface Request {
      currentUser?: JwtUser
    }
  }
}


//USER
interface TelegramUserAttributes {
  id: number;
  telegramId: string;
  telegramUsername: string;
  name: string;
  role: Role;
  // TelegramUserId: number;
}

interface UserCreationAttributes extends Optional<TelegramUserAttributes, 'id'> {}

class TelegramUser extends Model<TelegramUserAttributes, UserCreationAttributes> implements TelegramUserAttributes {
  public id!: number;
  public telegramId!: string;
  public telegramUsername!: string;
  public name!: string;
  public role!: Role;
  // public TelegramUserId: number;
}

interface JwtUser {
  id: number;
  username: string;
  authorizationType: AuthorizationType;
  TelegramUserId: number;
  role: Role
}

//DESKTOP_USER
interface UserAttributes {
  id: number;
  username: string;
  password: string;
  authorizationType: AuthorizationType;
  TelegramUserId: number;
}

interface UserCreationAttributes extends Optional<UserAttributes, 'id'> {
  TelegramUserId: number;
}

class User extends Model<UserAttributes, UserCreationAttributes> implements UserAttributes {
  public id!: number;
  public username!: string;
  public password!: string;
  public authorizationType!: 'LIMIT' | 'FULL';
  public TelegramUserId!: number;
  public TelegramUser?: TelegramUser;
  // public TelegramUser!: TelegramUserAttributes
}

//BOT
interface BotAttributes {
  id: number;
  telegramId: string;
  token: string;
  UserId?: number;
}

interface BotCreationAttributes extends Optional<BotAttributes, 'id'> {
  // UserId: number;
  // telegramId: string;
  // token: string;
}

class Bot extends Model<BotAttributes, BotCreationAttributes> implements BotAttributes {
  public id!: number;
  public telegramId!: string;
  public token!: string;
  public UserId!: number;
}

//GROUP
interface GroupAttributes {
  id: number;
  name?: string;
  telegramId: string;
}

interface GroupCreationAttributes extends Optional<GroupAttributes, 'id'> {}

class Group extends Model<GroupAttributes, GroupCreationAttributes> implements GroupAttributes {
  public id!: number;
  public name?: string;
  public telegramId!: string;
}

//ORDER
interface OrderAttributes {
  id: number;
  datetime?: Date;
  status?: string;
}

interface OrderCreationAttributes extends Optional<OrderAttributes, 'id'> {}

class Order extends Model<OrderAttributes, OrderCreationAttributes> implements OrderAttributes {
  public id!: number;
  public datetime?: Date;
  public status?: string;
}

//ORDER TYPE
interface OrderTypeAttributes {
  id: number;
  name?: Date;
}

interface OrderTypeCreationAttributes extends Optional<OrderTypeAttributes, 'id'> {}

class OrderType extends Model<OrderTypeAttributes, OrderTypeCreationAttributes> implements OrderTypeAttributes {
  public id!: number;
  public name?: Date;
}

//POINT
interface PointAttributes {
  id: number;
  name?: Date;
}

interface PointCreationAttributes extends Optional<PointAttributes, 'id'> {}

class Point extends Model<PointAttributes, PointCreationAttributes> implements PointAttributes {
  public id!: number;
  public name?: Date;
}

export {
  TelegramUser, User, UserCreationAttributes, UserAttributes, Bot, Group, Order, OrderType, Point, JwtUser
}
