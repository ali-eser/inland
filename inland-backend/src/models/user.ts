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

  @HasMany(() => Note)
  notes!: Note[];
}

export default User;
