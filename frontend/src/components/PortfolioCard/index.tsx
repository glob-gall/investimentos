import Link from "next/link";
import { Chart } from "../Chart";
import { Portfolio } from "@/services/portfolio/dto/portfolio.dto";

// type PortfolioCardProps = {
//   portfolio: Portfolio
// }

export function PortfolioCard(props: Portfolio) {
  const {id,slug,title} = props


  return (
    <Link href={`/portfolio/${slug}`} className="rounded p-4 bg-zinc-800 max-w-md hover:bg-zinc-700 duration-200 hover:scale-105">
      <div className="flex justify-between mb-3">
        <p className="text-zinc-500 text-lg">{title}</p>
        <p className="text-zinc-500">R$ {100.333.toFixed(2)}</p>
      </div>

      <div>
        <Chart/>
        <p className="text-zinc-500 text-xs text-right">Ver detalhes</p>
      </div>
    </Link>
  )
}
