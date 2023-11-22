//@ts-nocheck
import { TelegramUser, User, Bot, Group, Order, OrderType, Point, TelegramMessage } from './models'
import { DataTypes } from 'sequelize';
import Database from './db';

TelegramUser.init(
  {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true, allowNull: false },
    telegramId: { type: DataTypes.STRING, allowNull: false},
    telegramUsername: { type: DataTypes.STRING(32), allowNull: false},
    name: { type: DataTypes.STRING },
    role: { type: DataTypes.ARRAY(DataTypes.STRING), defaultValue: ['user'] },
  },
  {
    timestamps: false,
    sequelize: Database,
    tableName: 'telegramUsers',
    modelName: 'telegramUser',
  }
);

User.init(
  {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true, allowNull: false },
    username: { type: DataTypes.STRING(50), unique: true },
    password: { type: DataTypes.STRING },
    authorizationType: { type: DataTypes.STRING, allowNull: false, defaultValue: 'limit' },
    TelegramUserId: { type: DataTypes.INTEGER, allowNull: false }
  },
  {
    timestamps: false,
    sequelize: Database,
    tableName: 'users',
    modelName: 'user'
  }
);

Bot.init(
  {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true, allowNull: false },
    telegramId: { type: DataTypes.STRING, allowNull: false },
    token: { type: DataTypes.STRING, allowNull: false },
    name: {type: DataTypes.STRING, allowNull: false}
    // DesktopUserId: { type: DataTypes.INTEGER, allowNull: false }
  },
  {
    timestamps: false,
    sequelize: Database,
    tableName: 'bots',
    modelName: 'bot'
  }
);

Group.init(
  {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true, allowNull: false },
    name: { type: DataTypes.STRING },
    telegramId: { type: DataTypes.STRING, allowNull: false },
  },
  {
    timestamps: false,
    sequelize: Database,
    tableName: 'groups',
    modelName: 'group'
  }
);

Order.init( //@ts-expect-error
  {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true, allowNull: false },
    datetime: { type: DataTypes.DATE },
    status: { type: DataTypes.STRING },
  },
  {
    timestamps: false,
    sequelize: Database,
    tableName: 'orders',
    modelName: 'order'
  }
);

OrderType.init(
  {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true, allowNull: false },
    name: { type: DataTypes.STRING },
  },
  {
    timestamps: false,
    sequelize: Database,
    tableName: 'orderTypes',
    modelName: 'orderType'
  }
);

Point.init(
  {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true, allowNull: false },
    number: { type: DataTypes.FLOAT },
  },
  {
    timestamps: false,
    sequelize: Database,
    tableName: 'points',
    modelName: 'point'
  }
);

TelegramMessage.init(
  {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true, allowNull: false },
    message: { type: DataTypes.JSON }
  },
  { 
    timestamps: false,
    sequelize: Database,
    tableName: 'telegramMessages',
    modelName: 'telegramMessage'
  }
)

User.hasMany(Group);
User.belongsTo(TelegramUser);
Bot.belongsTo(User);

Group.belongsTo(User);
Bot.hasOne(Group)
Group.hasMany(Order);
Group.hasOne(OrderType);

OrderType.hasMany(Order);

TelegramUser.hasOne(Point);
Point.hasMany(Order);
TelegramMessage.hasOne(Order)
User.hasMany(Order)

User.hasMany(OrderType)
export { TelegramUser, Bot, Group, Order, OrderType, Point, User };