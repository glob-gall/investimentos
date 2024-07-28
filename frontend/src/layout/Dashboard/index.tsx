import { Button } from "@/components/Button"
import { Footer } from "@/components/Footer"
import { Header } from "@/components/Header"
import { PortfolioCard } from "@/components/PortfolioCard"

function Dashboard() {
  return (
    <>
    <Header/>
    <div className="bg-zinc-900 min-h-screen p-4 flex justify-center">
        
    <div className="flex-1 max-w-screen-xl">
      <div className="flex flex-row items-center justify-between flex-wrap">
        <h1 className="text-zinc-100 font-semibold text-xl">DASHBOARD</h1>
        <Button title="Criar Nova Carteira" className="ml-2"/>
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