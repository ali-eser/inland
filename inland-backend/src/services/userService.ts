import bcrypt from "bcrypt";  
import User from "../models/user";

const fetchUser = async (id? :number) => {
  try {
    if (id) {
      return await User.findByPk(id);
    }
    return await User.findAll({});
  } catch (e) {
    console.error(e);
    return null;
  }
};

const addUser = async (username: string, email: string, name: string, password: string) => {
  const saltRounds = await bcrypt.genSalt(10);
  const passwordHash = await bcrypt.hash(password, saltRounds);

  return await User.create({
    username,
    email,
    name,
    passwordHash
  });
};

const removeUser = async (id :number) => {
  try {
    return await User.destroy({ where: { id } });
  } catch (e) {
    console.error(e);
    return e;
  }
};

export default { addUser, fetchUser, removeUser };