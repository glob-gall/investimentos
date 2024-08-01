"use client"

import { Button } from "@/components/Button"
import { Input } from "@/components/Input"
import { authService } from "@/services/auth/auth-service"
import { AppError } from "@/services/http/dto/app-error"
import { userStore } from "@/store/userStore"
import { zodResolver } from "@hookform/resolvers/zod"
import Image from "next/image"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { useCallback, useEffect, useState } from "react"
import { Controller, SubmitHandler, useForm } from "react-hook-form"
import { Bounce, toast } from "react-toastify"
import { z } from "zod"


const LoginFormSchema = z.object({
  email: z.string({message:'Campo obrigatório'}).email({message:'E-mail invalido'}).min(1),
  password: z.string({message:'Campo obrigatório'}).min(1,{message:'Campo obrigatório'}),
})
type LoginFormData = z.infer<typeof LoginFormSchema>


function LoginForm() {
  const {setUserAndToken} = userStore()
  const router = useRouter()

  const [loading, setLoading] = useState(false)

  const handleLogin:SubmitHandler<LoginFormData> = useCallback(async (dto:LoginFormData)=>{
    if (loading) return;

    try {
      setLoading(true)
      const {user,token} = await authService.login(dto)
      setUserAndToken(user, token)
      router.replace('dashboard')
      toast.success(`Bem vindo ${user.name}!`);
    } catch (err) {
      const error:AppError = err as AppError

      if (error.response.status === 401) {
        toast.error('Façoa login novamente');

      }else {
        toast.error('Ocorreu um erro inesperado');
      }
    }
    
    setLoading(false)
  },[loading, setUserAndToken, router])

  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<LoginFormData>({
    resolver:zodResolver(LoginFormSchema)
  })  

  return (
    <form 
      onSubmit={handleSubmit(handleLogin)}
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
          Login 
        </h1>

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
        <Link href='/register'>
          <Button title="cadastrar-se" color="secondary" />
        </Link>
        <Button title="Entrar" color="primary" type="submit" loading={loading}/>
      </div>
    </form>
  )
}
export default LoginForm