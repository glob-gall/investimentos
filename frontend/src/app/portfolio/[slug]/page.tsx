"use client"
import Portfolio from "@/layout/Portfolio";

type Props = {
  params: {
    slug: string
  }
  searchParams:any
}

function PortfolioPage(props:Props) {
  
  return <Portfolio slug={props.params.slug}/>
}

export default PortfolioPage