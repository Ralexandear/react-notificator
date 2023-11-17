import { User, DesktopUser, Bot, Group, Order, OrderType, Point, Contact } from './models'
import { DataTypes } from 'sequelize';
import Database from './db';

User.init(
  {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true, allowNull: false },
    name: { type: DataTypes.STRING },
    role: { type: DataTypes.ARRAY(DataTypes.STRING), defaultValue: ['user'] },
  },
  { timestamps: false, sequelize: Database }
);

DesktopUser.init(
  {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true, allowNull: false },
    username: { type: DataTypes.STRING(50), unique: true },
    password: { type: DataTypes.STRING },
    authorization_type: { type: DataTypes.STRING, allowNull: false, defaultValue: 'limit' },
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
    telegram_id: { type: DataTypes.STRING, allowNull: false },
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

Contact.init(
  {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true, allowNull: false },
    telegram_id: { type: DataTypes.STRING },
    telegram_username: { type: DataTypes.STRING },
  },
  { timestamps: false, sequelize: Database }
);

User.hasMany(Bot);
DesktopUser.belongsTo(User);
Bot.belongsTo(User);

User.hasMany(Group);
Contact.belongsTo(User);
Group.belongsTo(User);

Group.hasOne(Bot);

Group.hasMany(Order);
Group.hasOne(OrderType);
OrderType.hasMany(Order);

Group.hasOne(OrderType);

Point.hasOne(User);
Point.hasMany(Order);
User.hasMany(Point);
User.hasMany(OrderType);

export { User, Bot, Group, Order, OrderType, Point, Contact, DesktopUser };