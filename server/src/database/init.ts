import { TelegramUser, User, Bot, Group, Order, OrderType, Point } from './models'
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
  { timestamps: false, sequelize: Database }
);

User.init(
  {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true, allowNull: false },
    username: { type: DataTypes.STRING(50), unique: true },
    password: { type: DataTypes.STRING },
    authorizationType: { type: DataTypes.STRING, allowNull: false, defaultValue: 'limit' },
    // TelegramUserId: { type: DataTypes.NUMBER, allowNull: false }
  },
  { timestamps: false, sequelize: Database }
);

Bot.init(
  {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true, allowNull: false },
    token: { type: DataTypes.STRING, allowNull: false },
  },
  { timestamps: false, sequelize: Database }
);

Group.init(
  {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true, allowNull: false },
    name: { type: DataTypes.STRING },
    telegramId: { type: DataTypes.STRING, allowNull: false },
  },
  { timestamps: false, sequelize: Database }
);

Order.init(
  {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true, allowNull: false },
    datetime: { type: DataTypes.DATE },
    status: { type: DataTypes.STRING },
  },
  { timestamps: false, sequelize: Database }
);

OrderType.init(
  {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true, allowNull: false },
    name: { type: DataTypes.DATE },
  },
  { timestamps: false, sequelize: Database }
);

Point.init(
  {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true, allowNull: false },
    name: { type: DataTypes.DATE },
  },
  { timestamps: false, sequelize: Database }
);

User.hasMany(Group);
User.belongsTo(TelegramUser);
Bot.belongsTo(User);

Group.belongsTo(User);
Group.hasOne(Bot);
Group.hasMany(Order);
Group.hasOne(OrderType);

OrderType.hasMany(Order);

Point.hasOne(TelegramUser);
Point.hasMany(Order);

TelegramUser.hasMany(Point);
TelegramUser.hasMany(OrderType);

export { TelegramUser, Bot, Group, Order, OrderType, Point, User };