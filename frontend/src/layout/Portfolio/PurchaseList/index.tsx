import { Button } from "@/components/Button"
import { Purchase } from "@/services/portfolio/dto/purchase.dto"
import { portfolioService } from "@/services/portfolio/portfolio-service"
import { portfolioStore } from "@/store/portfolioStore"
import { useCallback } from "react"
import { toast } from "react-toastify"

type PurchaseListProps = {
    portfolioId:string
    purchases: Purchase[]
}

function PurchaseList(props:PurchaseListProps) {
    const {purchases,portfolioId} = props
    const {updatePortfolio} = portfolioStore()

    const deletePurchase = useCallback( async (purchaseId:string) => {
        try {
            const response = await portfolioService.removePurchase(portfolioId, purchaseId)
            updatePortfolio(response)
            toast.success('Compra deletada com sucesso!')
        } catch (error) {
            toast.error('Ocorreu um erro!')
            
        }
    },[portfolioId, updatePortfolio])

  return (
    <div className="rounded overflow-hidden mb-11">
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
                      R$ {Number(p.price).toFixed(2)}
                  </td>
                  <td className="px-6 py-4">
                      R$ {Number(p.capital).toFixed(2)}
                  </td>
                  <td className="px-6 py-4">
                      {new Date(p.date).toLocaleDateString()}
                  </td>
                  <td className="px-6 py-4">
                    <Button 
                        color="danger" 
                        title="Deletar" 
                        onClick={() => deletePurchase(p.id)}
                    />
                  </td>
              </tr>
              ))}
          </tbody>
      </table>
    </div>
  )
}

export default PurchaseList