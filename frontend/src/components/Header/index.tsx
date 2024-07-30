import Image from "next/image";
import Link from "next/link";
import { Button } from "../Button";
import { userStore } from "@/store/userStore";
import { useCallback } from "react";

export function Header() {
  const {logout} = userStore()

  const handleLogout = useCallback(()=>{
    logout()
  },[logout])

  return (
    <div className="p-4 flex flex-row items-center bg-zinc-900">
      <Link href="/dashboard" className="flex flex-row items-center hover:bg-zinc-800 p-1 rounded-lg duration-200">
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

      <Button title="Logout" className="ml-auto" color="basic" onClick={handleLogout}/>

    </div>
  )
}
