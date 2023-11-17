import { DataTypes, Model, Optional } from "sequelize";
import Database from "./db";

//USER
interface TelegramUserAttributes {
  id: number;
  telegramId: string;
  telegramUsername: string;
  name: string;
  role: string[];
  // TelegramUserId: number;
}

interface UserCreationAttributes extends Optional<TelegramUserAttributes, 'id'> {}

class TelegramUser extends Model<TelegramUserAttributes, UserCreationAttributes> implements TelegramUserAttributes {
  public id!: number;
  public telegramId!: string;
  public telegramUsername!: string;
  public name!: string;
  public role!: ('ADMIN'| 'USER')[];
  // public TelegramUserId: number;
}

//DESKTOP_USER
interface UserAttributes {
  id: number;
  username: string;
  password: string;
  authorizationType: 'limit' | 'full';
}

interface UserCreationAttributes extends Optional<UserAttributes, 'id'> {}

class User extends Model<UserAttributes, UserCreationAttributes> implements UserAttributes {
  public id!: number;
  public username!: string;
  public password!: string;
  public authorizationType!: "limit" | "full";
}

//BOT
interface BotAttributes {
  id: number;
  token: string;
}

interface BotCreationAttributes extends Optional<BotAttributes, 'id'> {}

class Bot extends Model<BotAttributes, BotCreationAttributes> implements BotAttributes {
  public id!: number;
  public token!: string;
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
  TelegramUser, User, UserCreationAttributes, Bot, Group, Order, OrderType, Point
}
