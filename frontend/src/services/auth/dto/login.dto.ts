import { User } from "@/services/user/dto/user.dto"

export type LoginDto = {
  email: string
  password: string
}



export type LoginResponseDto = {
  token: string,
  user:User
}