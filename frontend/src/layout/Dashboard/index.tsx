import { Button } from "@/components/Button"
import { Footer } from "@/components/Footer"
import { Header } from "@/components/Header"
import { Modal } from "@/components/Modal"
import { PortfolioCard } from "@/components/PortfolioCard"
import { userStore } from "@/store/userStore"
import { PortfolioFormModal } from "./PortfolioModalForm"
import { useCallback, useEffect } from "react"
import { portfolioService } from "@/services/portfolio/portfolio-service"
import { toast } from "react-toastify"


function Dashboard() {
  const {user} = userStore()

  const LoadPortfolios = useCallback(async () =>{
    try {
      const resp = await portfolioService.list()
      console.log(resp);
      
    } catch (error) {
      toast.error('Ocorreu um erro ao carregar as carteiras!')
    }
  },[])

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
          {/* <Button title="Criar Nova Carteira" className=""/> */}
          
            <PortfolioFormModal/>
        </div>
      </div>
      
    
      <div className="mt-5 flex gap-3 flex-wrap">
        <PortfolioCard
          title="Criptomoedas"
          totalPrice={1000.234}
        />
        <PortfolioCard
          title="Ações entrangeiras"
          totalPrice={564.378}
        />
        <PortfolioCard
          title="Fundos imobiliarios"
          totalPrice={421.378}
        />
        <PortfolioCard
          title="Ações entrangeiras"
          totalPrice={564.378}
        />
        <PortfolioCard
          title="Fundos imobiliarios"
          totalPrice={421.378}
        />
      </div>    
    </div>
    </div>
    <Footer/>
    </>
  )
}

export default Dashboard