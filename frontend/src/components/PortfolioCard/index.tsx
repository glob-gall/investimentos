import Link from "next/link";
import { Chart } from "../Chart";

type PortfolioCardProps = {
  title:string,
  totalPrice:number
}

export function PortfolioCard(props: PortfolioCardProps) {
  const {title,totalPrice} = props


  return (
    <Link href={`/portfolio/${title}`} className="rounded p-4 bg-zinc-800 max-w-md hover:bg-zinc-700 duration-200 hover:scale-105">
      <div className="flex justify-between mb-3">
        <p className="text-zinc-500 text-lg">{title}</p>
        <p className="text-zinc-500">R$ {totalPrice.toFixed(2)}</p>
      </div>

      <div>
        <Chart/>
        <p className="text-zinc-500 text-xs text-right">Ver detalhes</p>
      </div>
    </Link>
  )
}
