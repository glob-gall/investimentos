import Image from "next/image";
import Link from "next/link";

export function Header() {
  return (
    <div className="p-4 flex flex-row items-center bg-zinc-900">
      <Link href="/dashboard" className="flex flex-row items-center">
        <Image
          className="rounded"
          src='/images/bossa-logo.png'
          alt="background-yellow"
          width={42} 
          height={42} 
        />
        <h4 className="font-bold text-3xl text-zinc-300 ml-3">
          Invest+
        </h4>
      </Link>
    </div>
  )
}
