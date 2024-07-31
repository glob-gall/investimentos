
export type Asset = {
  id:string,
  identifier:string
}

export type Purchase = {
  id:string,
  capital:number,
  price:number,
  date:Date,
  asset:Asset
}
