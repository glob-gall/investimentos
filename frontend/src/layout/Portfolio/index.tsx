import { Button } from "@/components/Button"
import { Footer } from "@/components/Footer"
import { Header } from "@/components/Header"
import PurchaseList from "./PurchaseList"
import { Chart } from "@/components/Chart"
import { PurchaseForm } from "./PurchaseForm"
import { useCallback, useMemo } from "react"
import { portfolioService } from "@/services/portfolio/portfolio-service"
import { Portfolio } from "@/services/portfolio/dto/portfolio.dto"
import { boolean } from "zod"
import LoadingPage from "../Loading"
import { portfolioStore } from "@/store/portfolioStore"
import PortfolioNotFound from "./PortfolioNotFound"
import { getInfoFromPurchases } from "@/utils/getInfoFromPurchases"
import { Modal } from "@/components/Modal"
import { toast } from "react-toastify"
import { useRouter } from "next/navigation"

// const purchases:Purchase[] = [
//   {
//     id:'1',
//     data: new Date(),
//     asset:{
//       identifier:'AA1',
//     },
//     capital:1000.120,
//     price:52.100
//   },
//   {
//     id:'12',
//     data: new Date(),
//     asset:{
//       identifier:'BTC',
//     },
//     capital:1470.120,
//     price:553.100
//   },
//   {
//     id:'13',
//     data: new Date(),
//     asset:{
//       identifier:'MNR',
//     },
//     capital:34.120,
//     price:98.100
//   }
// ] 

type PortfolioProps = {
  slug: string
}

function PortfolioLayout(props:PortfolioProps) {
  const {slug} = props
  const {portfolios} = portfolioStore()
  const router = useRouter()

  const portfolio = useMemo(() =>portfolios.find(p => p.slug === slug),[portfolios,slug])

  
  const {labels,series,sum} = useMemo(
    ()=> getInfoFromPurchases(portfolio?.purchases || []),
  [portfolio])


  

  const handleDeletePortfolio = useCallback(async()=>{
    if (portfolio) {
      try {
        await portfolioService.delete(portfolio.id)
        router.replace('/dashboard')
        toast.success(`Portfolio ${portfolio.title} deletado com sucesso!`)
      } catch (error) {
        toast.error(`Portfolio ${portfolio.title} não pode ser deletado`)
        
      }
    }
  },[portfolio, router])

  
  
  if (!portfolio) return <PortfolioNotFound slug={slug} />
  return (
    <>
    <Header/>
    <div className="bg-zinc-900 min-h-screen p-4 flex justify-center">
        
    <div className="flex-1 max-w-screen-xl">
      <div className="flex flex-row items-center justify-between flex-wrap">
        <h1 className="text-zinc-100 font-semibold text-xl">Carteira - {portfolio.title}</h1>

        <Modal
          buttonProps={{title:'Deletar Carteira', color:'danger'}} 
          title="Deletar Carteira"
          cancel={{
                title:'Cancelar', 
                color:'basic'
           }}
          confirm={{
                title:'Deletar', 
                onClick:handleDeletePortfolio,
                color:'danger'
           }}
        >
          <p className="text-zinc-500">
          Você realmente deseja Excluir esta carteira?
          </p>
        </Modal>
      </div>

      <div className="mt-5 flex flex-col gap-3">

        <div className="bg-zinc-800 p-4 rounded flex flex-row justify-between">
          <div className="flex flex-col justify-between">
            <div>
              <p className="text-lg text-zinc-500 mb-auto">{portfolio.title}</p>
            </div>
            <div className="mt-auto">
              <p className="text-lg text-zinc-500 font-bold">R$ {sum.toFixed(2)}</p>
            </div>
          </div>
          <div className="">
            <Chart
              width={360}
              labels={labels}
              series={series}
            />
          </div>
        </div>

        <PurchaseForm portfolioId={portfolio.id}/>
        <PurchaseList portfolioId={portfolio.id} purchases={portfolio.purchases}/>
      </div>
    </div>
    </div>
    <Footer/>
    </>
  )
}

export default PortfolioLayout