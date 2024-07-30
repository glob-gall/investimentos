import { Button } from "@/components/Button"
import { Footer } from "@/components/Footer"
import { Header } from "@/components/Header"
import { Modal } from "@/components/Modal"
import { PortfolioCard } from "@/components/PortfolioCard"
import { userStore } from "@/store/userStore"
import { PortfolioFormModal } from "./PortfolioModalForm"
import { useCallback, useEffect, useState } from "react"
import { portfolioService } from "@/services/portfolio/portfolio-service"
import { toast } from "react-toastify"
import { Portfolio } from "@/services/portfolio/dto/portfolio.dto"
import { portfolioStore } from "@/store/portfolioStore"


function Dashboard() {
  const {user} = userStore()
  const [loading, setLoading] = useState(false)
  const {portfolios, setPortfolios} = portfolioStore()

  const LoadPortfolios = useCallback(async () =>{
    setLoading(true)
    try {
      const response = await portfolioService.list()
      setPortfolios(response)      
    } catch (error) {
      toast.error('Ocorreu um erro ao carregar as carteiras!')
    }
    setLoading(false)
  },[setPortfolios])

  useEffect(()=>{
    LoadPortfolios()
  },[LoadPortfolios])

  return (
    <>
    <Header/>
    <div className="bg-zinc-900 min-h-screen p-4 flex justify-center">
        
    <div className="flex-1 max-w-screen-xl">
      <div className="flex flex-row items-center justify-between flex-wrap">
        <h1 className="text-zinc-100 font-semibold text-xl">Bem-vindo, {user?.name}!</h1>
        <div className="flex gap-2">          
            <PortfolioFormModal buttonProps={{title:'Nova Carteira'}}/>
        </div>
      </div>
      
    
      <div className="my-8 flex gap-3 flex-wrap">

        {
          portfolios.length === 0 ?
          <div className="flex flex-row w-auto justify-center items-center gap-2 mt-16 mx-auto">
            <p className="text-zinc-500 text-xl">
              Você ainda não tem nenhuma carteira salva
            </p>
            <PortfolioFormModal buttonProps={{title:'Nova Carteira', color:'basic'}}/>
          </div>

          : portfolios.map( p => (
            <PortfolioCard
              key={p.id}
              {...p}
            />
          ))
        }
      </div>    
    </div>
    </div>
    <Footer/>
    </>
  )
}

export default Dashboard