import { userLoginResponseDTO, UserSingupResponseDTO } from "../dto/userDTO";
import { UserInterface } from "../interfaces/Model/IUser";

export const mapToSignupResponseDTO = (
  user: UserInterface,
  token: string
): UserSingupResponseDTO => {
  return {
    id: user.id,
    name: user.name,
    email: user.email,
    token,
  };
};

export const mapToLoginResponseDTO = (
  user: UserInterface,
  token: string
): userLoginResponseDTO => {
  return {
    data: {
      id: user.id,
      name: user.name,
      email: user.email,
    },
    token,
  };
};

