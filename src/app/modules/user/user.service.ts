import { TUser } from "./user.interface";
import { User } from "./user.model";

const createUserIntoDB = async (userData: TUser) => {
  //   if (await User.isUserExists(userData.id)) {
  //     throw new Error("User already exists");
  //   }

  const result = await User.create(userData);
  return result;
};

export const UserService = {
  createUserIntoDB,
};
