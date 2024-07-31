"use client"
import Portfolio from "@/layout/Portfolio";
import ProtectedPage from "@/layout/ProtectedPage";

type Props = {
  params: {
    slug: string
  }
  searchParams:any
}

function PortfolioPage(props:Props) {
  
  return (
    <ProtectedPage>
      <Portfolio slug={props.params.slug}/>
    </ProtectedPage>
    )
}

export default PortfolioPage