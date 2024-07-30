import Image from "next/image";

export default function LoadingPage() {
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
        <h1 className="text-zinc-200 text-4xl">Carregando...</h1>
      </div>
    </div>
  )
}