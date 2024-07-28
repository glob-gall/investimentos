"use client"

import { Button } from "@/components/Button"
import { Input } from "@/components/Input"
import Image from "next/image"
import Link from "next/link";

function RegisterForm() {  

  return (
    <div className="bg-zinc-900 max-w-full w-96 p-6  ">
      
      <div className="flex flex-col items-center">
        <Image
            className="rounded-3xl mt-36"
            src='/images/bossa-logo.png'
            alt="background-yellow"
            width={164} 
            height={164} 
          />
          <h1 className="text-zinc-50 font-semibold text-2xl">
            Cadastre-se
          </h1>

      </div>

      <div className="mt-3" >
        <Input name="name" label="Nome" placeholder="Nome"/>
      </div>
      <div className="mt-3" >
        <Input name="email" label="E-mail" placeholder="E-mail"/>
      </div>
      <div className="mt-3">
      <Input name="password" label="Senha" placeholder="Senha"/>
      </div>

      <div className="flex gap-2 justify-end mt-4">
        <Link href="/login">
          <Button title="Voltar" color="secondary" />
        </Link>
        <Button title="Cadastrar-se" color="primary"/>
      </div>
    </div>
  )
}
export default RegisterForm