import { BelongsTo, ForeignKey, Model, DataType, Table, Column } from "sequelize-typescript";
import User from "./user";

@Table({
  tableName: "notes",
  timestamps: true,
  underscored: true
})
class Note extends Model {
  @Column({
    primaryKey: true,
    type: DataType.INTEGER,
    autoIncrement: true
  })
  id!: number;

  @Column({
    type: DataType.TEXT,
    unique: false
  })
  content!: string;

  @ForeignKey(() => User)

  @Column(DataType.INTEGER)
  userId!: number;

  @BelongsTo(() => User, { onDelete: 'CASCADE' })
  user!: User;
}

export default Note;
