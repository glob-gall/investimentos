import { User } from "@/services/user/dto/user.dto"
import { Portfolio } from "./portfolio.dto"

export type CreatePortfolioDto = {
  title: string,
}
export type CreatePortfolioResponseDto = User & {
  portfolios: Portfolio[]
}
