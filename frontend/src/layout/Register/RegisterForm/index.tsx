"use client"

import { Button } from "@/components/Button"
import { Input } from "@/components/Input"
import { userService } from "@/services/user/user-service"
import { AppError } from "@/services/http/dto/app-error"
import { userStore } from "@/store/userStore"
import { zodResolver } from "@hookform/resolvers/zod"
import Image from "next/image"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { useCallback, useState } from "react"
import { Controller, SubmitHandler, useForm } from "react-hook-form"
import {  toast } from "react-toastify"
import { z } from "zod"


const RegisterFormSchema = z.object({
  name: z.string({message:'Campo obrigatório'}).min(1, {message:'Campo obrigatório'}),
  email: z.string({message:'Campo obrigatório'}).email({message:'E-mail invalido'}).min(1),
  password: z.string({message:'Campo obrigatório'}).min(1,{message:'Campo obrigatório'}),
})
type registerFormData = z.infer<typeof RegisterFormSchema>


function RegisterForm() {
  const {setUserAndToken} = userStore()
  const router = useRouter()

  const [loading, setLoading] = useState(false)

  const handleRegister:SubmitHandler<registerFormData> = useCallback(async (dto:registerFormData)=>{
    if (loading) return;

    try {
      setLoading(true)
      const user = await userService.create(dto)
      router.replace('login')
      toast.success(`Conta criada com sucesso, ${user.name}! Faça login para entrar em nossa plataforma`);
    } catch (err) {
      const error:AppError = err as AppError
      if (error.response.status === 401) {
        toast.error('Façoa login novamente');
      }else {
        toast.error('Ocorreu um erro inesperado');
      }
    }
    
    setLoading(false)
  },[loading, router])

  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<registerFormData>({
    resolver:zodResolver(RegisterFormSchema)
  })  

  return (
    <form 
      onSubmit={handleSubmit(handleRegister)}
      className="bg-zinc-900 max-w-full w-96 p-6"
    >
      
      <div className="flex flex-col items-center">
        <Image
            className="rounded-3xl mt-36"
            src='/images/bossa-logo.png'
            alt="background-yellow"
            width={164} 
            height={164} 
        />
        <h1 className="text-zinc-50 font-semibold text-2xl">
          Registre-se 
        </h1>

      </div>

      <div className="mt-3" >
      <Controller
        control={control}
        name="name"
        render={({ field }) => (
          <Input
            id='name'
            label="Nome" 
            placeholder="Nome"
            error={errors.name}
            haveError={!!errors.name}
            {...field} 
          />
        )}
      />
      </div>
      <div className="mt-3" >
      <Controller
        control={control}
        name="email"
        render={({ field }) => (
          <Input
            id='email'
            label="E-mail" 
            placeholder="E-mail"
            error={errors.email}
            haveError={!!errors.email}
            {...field} 
          />
        )}
      />
      </div>
      <div className="mt-3">
      <Controller
        control={control}
        name="password"
        render={({ field }) => (
          <Input
            id='senha'
            label="Senha" 
            placeholder="Senha"
            error={errors.password}
            haveError={!!errors.password}
            {...field}
            type="password"
          />
        )}
      />
      </div>

      <div className="flex gap-2 justify-end mt-4">
        <Link href='/login'>
          <Button title="Voltar" color="secondary" />
        </Link>
        <Button title="Cadastrar-se" color="primary" type="submit" loading={loading}/>
      </div>
    </form>
  )
}
export default RegisterForm