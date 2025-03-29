import { Model, HasMany, DataType, Table, Column } from "sequelize-typescript";
import Note from "./note";

@Table({
  tableName: "users",
  timestamps: true,
  underscored: true
})
class User extends Model {
  @Column({
    primaryKey: true,
    type: DataType.INTEGER,
    autoIncrement: true
  })
  id!: number;

  @Column({
    type: DataType.STRING,
    allowNull: false,
    unique: true
  })
  username!: string;

  @Column({
    type: DataType.STRING,
    allowNull: false,
    unique: true
  })
  email!: string;

  @Column({
    type: DataType.STRING,
    allowNull: false
  })
  passwordHash!: string;

  @Column({
    type: DataType.STRING,
    allowNull: false
  })
  encryptedMasterKey!: string;

  @Column({
    type: DataType.STRING(64),
    allowNull: false
  })
  keyDerivationSalt!: string;

  @Column({
    type: DataType.ENUM('active', 'suspended', 'deleted'),
    defaultValue: 'active'
  })
  status!: string;

  @Column({
    type: DataType.DATE,
    allowNull: true
  })
  lastLoginAt?: Date;

  @Column({
    type: DataType.INTEGER,
    defaultValue: 0
  })
  failedLoginAttempts!: number;

  @HasMany(() => Note)
  notes!: Note[];
}

export default User;
