import { Purchase } from "./purchase.dto"

export type Portfolio = {
  id:string,
  title:string,
  slug:string,
  purchases: Purchase[]
}

