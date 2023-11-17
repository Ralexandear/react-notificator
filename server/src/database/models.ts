import { DataTypes, Model, Optional } from "sequelize";
import Database from "./db";

interface UserAttributes {
  id: number;
  name?: string;
  role?: string[];
}

interface UserCreationAttributes extends Optional<UserAttributes, 'id'> {}

interface DesktopUserAttributes {
  id: number;
  username: string;
  password: string;
  authorization_type: string;
}

interface DesktopUserCreationAttributes extends Optional<DesktopUserAttributes, 'id'> {}

interface BotAttributes {
  id: number;
  token: string;
}

interface BotCreationAttributes extends Optional<BotAttributes, 'id'> {}

interface GroupAttributes {
  id: number;
  name?: string;
  telegram_id: string;
}

interface GroupCreationAttributes extends Optional<GroupAttributes, 'id'> {}

interface OrderAttributes {
  id: number;
  datetime?: Date;
  status?: string;
}

interface OrderCreationAttributes extends Optional<OrderAttributes, 'id'> {}

interface OrderTypeAttributes {
  id: number;
  name?: Date;
}

interface OrderTypeCreationAttributes extends Optional<OrderTypeAttributes, 'id'> {}

interface PointAttributes {
  id: number;
  name?: Date;
}

interface PointCreationAttributes extends Optional<PointAttributes, 'id'> {}

interface ContactAttributes {
  id: number;
  telegram_id?: string;
  telegram_username?: string;
}

interface ContactCreationAttributes extends Optional<ContactAttributes, 'id'> {}

class User extends Model<UserAttributes, UserCreationAttributes> implements UserAttributes {
  public id!: number;
  public name?: string;
  public role?: string[];
}

class DesktopUser extends Model<DesktopUserAttributes, DesktopUserCreationAttributes> implements DesktopUserAttributes {
  public id!: number;
  public username!: string;
  public password!: string;
  public authorization_type!: string;
}

class Bot extends Model<BotAttributes, BotCreationAttributes> implements BotAttributes {
  public id!: number;
  public token!: string;
}

class Group extends Model<GroupAttributes, GroupCreationAttributes> implements GroupAttributes {
  public id!: number;
  public name?: string;
  public telegram_id!: string;
}

class Order extends Model<OrderAttributes, OrderCreationAttributes> implements OrderAttributes {
  public id!: number;
  public datetime?: Date;
  public status?: string;
}

class OrderType extends Model<OrderTypeAttributes, OrderTypeCreationAttributes> implements OrderTypeAttributes {
  public id!: number;
  public name?: Date;
}

class Point extends Model<PointAttributes, PointCreationAttributes> implements PointAttributes {
  public id!: number;
  public name?: Date;
}

class Contact extends Model<ContactAttributes, ContactCreationAttributes> implements ContactAttributes {
  public id!: number;
  public telegram_id?: string;
  public telegram_username?: string;
}

export {
  User, DesktopUser, Bot, Group, Order, OrderType, Point, Contact
}
