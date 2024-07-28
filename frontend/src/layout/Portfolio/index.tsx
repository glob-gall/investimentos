import { Button } from "@/components/Button"
import { Footer } from "@/components/Footer"
import { Header } from "@/components/Header"
import PurchaseList, { Purchase } from "./PurchaseList"
import { Chart } from "@/components/Chart"
import { PurchaseForm } from "./PurchaseForm"

const purchases:Purchase[] = [
  {
    id:'1',
    data: new Date(),
    asset:{
      identifier:'AA1',
    },
    capital:1000.120,
    price:52.100
  },
  {
    id:'12',
    data: new Date(),
    asset:{
      identifier:'BTC',
    },
    capital:1470.120,
    price:553.100
  },
  {
    id:'13',
    data: new Date(),
    asset:{
      identifier:'MNR',
    },
    capital:34.120,
    price:98.100
  }
] 

type PortfolioProps = {
  slug: string
}

function Portfolio(props:PortfolioProps) {
  const {slug} = props

  return (
    <>
    <Header/>
    <div className="bg-zinc-900 min-h-screen p-4 flex justify-center">
        
    <div className="flex-1 max-w-screen-xl">
      <div className="flex flex-row items-center justify-between flex-wrap">
        <h1 className="text-zinc-100 font-semibold text-xl">Carteira - {slug}</h1>
        <Button title="Deletar Carteira" className="ml-2" color="danger"/>
      </div>

      <div className="mt-5 flex flex-col gap-3">

        <div className="bg-zinc-800 p-4 rounded flex flex-row justify-between">
          <div className="flex flex-col justify-between">
            <div>
              <p className="text-lg text-zinc-500 mb-auto">{slug}</p>
            </div>
            <div className="mt-auto">
              <p className="text-lg text-zinc-500 font-bold">R$ 1852,44</p>
            </div>
          </div>
          <div className="">
            <Chart/>
          </div>
        </div>

        <PurchaseForm/>
        <PurchaseList purchases={purchases}/>
      </div>    
    </div>
    </div>
    <Footer/>
    </>
  )
}

export default Portfolio