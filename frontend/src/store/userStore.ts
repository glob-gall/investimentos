import { User } from '@/services/user/dto/user.dto';
import { create } from 'zustand'
import { createJSONStorage, persist } from 'zustand/middleware';
enum userRole {
  User = 'USER',
  Admin = 'ADMIN'
}



type UserState = {
  user?: User
  token?:string
};

type UserActions = {
  logout: () => void;
  setUser: (user:User) => void;
  setToken: (token:string) => void;
  setUserAndToken: (user:User, token:string) => void;
};



export const userStore = create(persist<UserState & UserActions>((set) => ({
  user:undefined,
  token:undefined,
  logout: () => set(() => ({ user: undefined })),
  setUser: (user:User) => set(() => ({ user })),
  setToken: (token:string) => set(() => ({ token })),
  setUserAndToken: (user:User, token:string) => set(() => ({ user, token })),
}),{
  name:'localstorage-users',
  storage:createJSONStorage(() => localStorage)
}))
// export const userStore = create<UserState & UserActions>((set) => ({
//   user:undefined,
//   token:undefined,
//   logout: () => set(() => ({ user: undefined })),
//   setUser: (user:User) => set(() => ({ user })),
//   setToken: (token:string) => set(() => ({ token })),
//   setUserAndToken: (user:User, token:string) => set(() => ({ user, token })),
// }))