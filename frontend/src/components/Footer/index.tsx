import Image from "next/image";

export function Footer() {
  return (
    <div className="p-4 flex flex-row items-center justify-center bg-zinc-800">
      <Image
        className="rounded"
        src='/images/bossa-logo.png'
        alt="background-yellow"
        width={42} 
        height={42} 
      />
      <h5 className="font-bold text-lg text-zinc-500 ml-3">
        Desenvolvido por Luis Felipe Galleguillos Campos
      </h5>
    </div>
  )
}
