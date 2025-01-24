import { Model, DataType, Table, Column } from "sequelize-typescript";

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
  id!: number

  @Column({
    type: DataType.STRING,
    unique: false
  })
  content!: string

  @Column({
    type: DataType.STRING,
    unique: false
  })
  title!: string
}

export default Note;
