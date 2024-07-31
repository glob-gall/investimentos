import Image from "next/image";
import Link from "next/link";

export function Footer() {
  return (
    <div className="p-4 flex flex-row items-center justify-center bg-zinc-800">
      <Image
        className="rounded"
        src='/images/bossa-logo.png'
        alt="background-yellow"
        width={36} 
        height={36} 
      />
      <h5 className="font-bold text-lg text-zinc-500 ml-3 ">
        Desenvolvido por{' '}  
        <Link
          className="text-zinc-400 hover:text-green-500 hover:bg-zinc-700 py-2 px-3 rounded-md duration-200" 
          href="https://www.linkedin.com/in/luis-felipe-galleguillos-3947b113a/"
        >
          Luis Felipe Galleguillos Campos
        </Link>
      </h5>
    </div>
  )
}
