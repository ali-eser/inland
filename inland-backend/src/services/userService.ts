import bcrypt from "bcrypt";  
import User from "../models/user";
import { NotFoundError } from "../../exceptions/NotFoundError";

const fetchUser = async (id: number) => {
  try {
    const user: User | null = await User.findByPk(id)
    if (!user) {
      throw new NotFoundError(`User with specified ID "${id}" not found`);
    }
    return user;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

const addUser = async (username: string, email: string, password: string) => {
  try {
    const saltRounds = await bcrypt.genSalt(10);
    const passwordHash = await bcrypt.hash(password, saltRounds);

    return await User.create({
      username,
      email,
      passwordHash
    });
  } catch (error: any) {
    console.error("Error creating user: ", error);

    if (error.name === "SequelizeUniqueConstraintError") {
      throw new Error("A user with provided username or email already exists");
    }

    throw error;
  }
};

const removeUser = async (id :number) => {
  try {
    return await User.destroy({ where: { id } });
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export default { addUser, fetchUser, removeUser };
