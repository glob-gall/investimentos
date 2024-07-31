import { Portfolio } from '@/services/portfolio/dto/portfolio.dto';
import { create } from 'zustand'
import { persist } from 'zustand/middleware';

type PortfolioState = {
  portfolios: Portfolio[]
};

type PortfolioActions = {
  setPortfolios: (portfolios: Portfolio[]) => void;
  addPortfolio: (portfolio: Portfolio) => void;
  removePortfolio: (portfolio: Portfolio) => void;  
  updatePortfolio: (portfolio: Portfolio) => void;  
};



export const portfolioStore = create(persist<PortfolioState & PortfolioActions>((set) => ({
  portfolios:[],

  setPortfolios: (portfolios:Portfolio[]) => set(
    () => ({ portfolios })
  ),
  
  addPortfolio: (portfolio:Portfolio) => set(
    (state)=>(
      {portfolios:[...state.portfolios, portfolio]}
    )
  ),
  
  removePortfolio: (portfolio:Portfolio) => set(
    (state)=>({
      portfolios: state.portfolios.filter(p => p.id !== portfolio.id)
    })
  ),
  
  updatePortfolio: (portfolio:Portfolio) => set(
      (state)=>{
        const newPortfolios = state.portfolios.map(
          p => p.id !== portfolio.id? p: portfolio
        )
        return {portfolios: newPortfolios}
      }),

}),{
  name:'localstorage-portfolios'
}))