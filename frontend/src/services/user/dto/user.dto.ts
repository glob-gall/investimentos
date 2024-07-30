import { UserRole } from "../enum/user-role.enum"

export type User = {
  id:string,
  email:string,
  name:string,
  role:UserRole
}

