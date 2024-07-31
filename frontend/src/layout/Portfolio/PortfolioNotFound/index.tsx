import { Button } from "@/components/Button";
import Image from "next/image";
import Link from "next/link";

type PortfolioNotFoundProps = {
  slug:string
}

export default function PortfolioNotFound(props: PortfolioNotFoundProps) {
  const {slug} = props
  return(
    <div className="h-screen w-screen flex items-center justify-center">
      <div className="flex items-center justify-center gap-4 flex-wrap">
        <Image
              className="rounded-md"
              src='/images/bossa-logo.png'
              alt="background-yellow"
              width={86} 
              height={86} 
          />
        <h1 className="text-zinc-200 text-2xl">
          Carteira não pode ser encontrada 
        </h1>
        <Link href='/dashboard'>
          <Button title="Voltar"/>
        </Link>
      </div>
    </div>
  )
}