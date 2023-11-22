import { RoleType, AuthorizationType, OrderStatusType } from "./types";
import { DataTypes, Model, Optional } from "sequelize";

interface JwtUser {
  id: number;
  username: string;
  authorizationType: AuthorizationType;
  telegramUserId: number;
  role: RoleType;
}

declare global {
  namespace Express {
    interface Request {
      currentUser?: JwtUser
    }
  }
}

interface TelegramUserAttributes {
  id: number;
  telegramId: string;
  telegramUsername: string;
  name: string;
  role: RoleType;
}

interface TelegramCreationAttributes extends Optional<TelegramUserAttributes, 'id'> {}

interface UserAttributes {
  id: number;
  username: string;
  password: string;
  authorizationType: AuthorizationType;
  telegramUserId: number;
}

interface UserCreationAttributes extends Optional<UserAttributes, 'id'> {
  telegramUserId: number;
}

interface BotAttributes {
  id: number;
  telegramId: string;
  token: string;
  name: string;
  userId: number;
}

interface BotCreationAttributes extends Optional<BotAttributes, 'id'> {}


//GROUP
interface GroupAttributes {
  id: number;
  name: string;
  telegramId: string;
  userId: number;
}

interface GroupCreationAttributes extends Optional<GroupAttributes, 'id'> {}

interface OrderAttributes {
  id: number;
  datetime: Date;
  status: OrderStatusType;
  groupId: number;
  pointId: number;
  orderTypeId: number;
  telegramMessageId: number;
  userId: number;
}

interface OrderCreationAttributes extends Optional<OrderAttributes, 'id'> {}

interface OrderTypeAttributes {
  id: number;
  name: string;
  groupId: number;
  userId: number;
}

interface OrderTypeCreationAttributes extends Optional<OrderTypeAttributes, 'id'> {}

interface PointAttributes {
  id: number;
  number: number;
  telegramUserId?: number
}

interface PointCreationAttributes extends Optional<PointAttributes, 'id'> {}

interface TelegramMessageAttributes {
  id: number;
  message: JSON;
}

interface TelegramMessageCreationAttributes extends Optional<TelegramMessageAttributes, 'id'> {}

export {
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
}
