import Link from "next/link";
import { Chart } from "../Chart";
import { Portfolio } from "@/services/portfolio/dto/portfolio.dto";
import { useMemo } from "react";
import { getInfoFromPurchases } from "@/utils/get-Info-from-purchases";

// type PortfolioCardProps = {
//   portfolio: Portfolio
// }

export function PortfolioCard(props: Portfolio) {
  const {slug,title,purchases} = props  
  const {labels,series,sum} = useMemo(()=> getInfoFromPurchases(purchases),[purchases])
  
  

  return (
    <Link 
      href={`/portfolio/${slug}`} 
      className="rounded p-4 bg-zinc-800 w-96 h-96 hover:bg-zinc-700 duration-200 hover:scale-105 flex flex-col"
    >
      <div className="flex justify-between mb-3 items-center">
        <p className="text-zinc-500 text-lg text-ellipsis overflow-hidden text-nowrap">{title}</p>
        <p className="text-zinc-500 text-nowrap">R$ {sum.toFixed(2)}</p>
      </div>

      <div className="flex-1 flex items-center justify-center">
        {purchases.length === 0 ?(
          <p className="text-zinc-500">
            Carteira vazia
          </p>
        )
        : (
          <Chart 
            width={256}
            labels={labels}
            series={series}
          />
        )}
      </div>
      <p className="text-zinc-500 text-xs text-right mt-auto">Ver detalhes</p>
    </Link>
  )
}
