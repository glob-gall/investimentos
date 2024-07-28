import { create } from 'zustand'
enum userRole {
  User = 'USER',
  Admin = 'ADMIN'
}

type User = {
  name:string,
  email:string,
  role: userRole
}

type UserState = {
  user: User | null;
};

type UserActions = {
  logout: () => void;
  setUser: (user:User) => void;
};



export const userStore = create<UserState & UserActions>((set) => ({
  user: null,
  logout: () => set(() => ({ user: null })),
  setUser: (user:User) => set(() => ({ user })),
}))