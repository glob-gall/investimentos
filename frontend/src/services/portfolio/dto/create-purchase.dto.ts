import { Portfolio } from "./portfolio.dto"

export type CreatePurchaseDto = {
  assetIdentifier: string,
  price: number,
  capital: number,
}

export type CreatePurchaseResponseDto = Portfolio
export type RemovePurchaseResponseDto = Portfolio
