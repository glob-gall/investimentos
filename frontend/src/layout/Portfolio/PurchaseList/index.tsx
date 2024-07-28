
type Asset = {
  identifier:string
}
export type Purchase = {
  id:string
  asset:Asset
  price:number
  capital: number
  data:Date
}

type PurchaseListProps = {
  purchases: Purchase[]
}

function PurchaseList(props:PurchaseListProps) {
  const {purchases} = props
  return (
    <div className="rounded overflow-hidden">
      <table className="w-full text-sm text-left rtl:text-right text-zinc-500 dark:text-zinc-400">
          <thead className="text-xs text-zinc-700 uppercase bg-zinc-50 dark:bg-zinc-700 dark:text-zinc-400">
              <tr>
                  <th scope="col" className="px-6 py-3">
                      Asset
                  </th>
                  <th scope="col" className="px-6 py-3">
                      Preço
                  </th>
                  <th scope="col" className="px-6 py-3">
                      Valor Investido
                  </th>
                  <th scope="col" className="px-6 py-3">
                      Data da Compra
                  </th>
                  <th scope="col" className="px-6 py-3">
                      Ações
                  </th>
              </tr>
          </thead>
          <tbody>
              {purchases.map( p => (
                <tr className="bg-white border-b dark:bg-zinc-800 dark:border-zinc-700" key={p.id}>
                  <th scope="row" className="px-6 py-4 font-medium text-zinc-900 whitespace-nowrap dark:text-white">
                      {p.asset.identifier}
                  </th>
                  <td className="px-6 py-4">
                      {p.price}
                  </td>
                  <td className="px-6 py-4">
                      {p.capital}
                  </td>
                  <td className="px-6 py-4">
                      {p.data.toLocaleDateString()}
                  </td>
                  <td className="px-6 py-4">
                      Deletar {p.id}
                  </td>
              </tr>
              ))}
          </tbody>
      </table>
    </div>
  )
}

export default PurchaseList