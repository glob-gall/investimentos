import { Portfolio } from '@/services/portfolio/dto/portfolio.dto';
import { User } from '@/services/user/dto/user.dto';
import { create } from 'zustand'

type PortfolioState = {
  portfolios: Portfolio[]
};

type PortfolioActions = {
  setPortfolios: (portfolios: Portfolio[]) => void;
  addPortfolio: (portfolio: Portfolio) => void;
  removePortfolio: (portfolio: Portfolio) => void;
  
};



export const portfolioStore = create<PortfolioState & PortfolioActions>((set) => ({
  portfolios:[],
  setPortfolios: (portfolios:Portfolio[]) => set(() => ({ portfolios })),
  addPortfolio: (portfolio:Portfolio) => set((state)=>({portfolios:[...state.portfolios, portfolio]})),
  removePortfolio: (portfolio:Portfolio) => set((state)=>({portfolios: state.portfolios.filter(p => p.id !== portfolio.id)})),
}))