import { User } from "./user.dto"

export type CreateUserDto = {
  name: string,
  email: string,
  password: string
}
export type CreateUserResponseDto = User & {}
