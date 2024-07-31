import {Purchase} from '@/services/portfolio/dto/purchase.dto'

export function getInfoFromPurchases (purchases?:Purchase[]) {
  if (!purchases) {
    return {labels:['a'],series:[1],sum:0}
  }
  let sum = 0
  let values: {[index:string]:number} ={};
  for (const purchase of purchases) {
    sum += Number(purchase.capital)

    values[purchase.asset.identifier] = values[purchase.asset.identifier]
      ? values[purchase.asset.identifier] + Number(purchase.capital)
      : Number(purchase.capital)
  }
  const labels = Object.keys(values)
  const series = Object.values(values)

  return {labels,series,sum}
}