import { Button } from "@/components/Button";
import { Input } from "@/components/Input";
import { AppError } from "@/services/http/dto/app-error";
import { portfolioService } from "@/services/portfolio/portfolio-service";
import { portfolioStore } from "@/store/portfolioStore";
import { zodResolver } from "@hookform/resolvers/zod";
import { useCallback, useState } from "react";
import { Controller, SubmitHandler, useForm } from "react-hook-form";
import { toast } from "react-toastify";
import { z } from "zod";

type PurchaseFormProps = {
  portfolioId:string
}

const LoginFormSchema = z.object({
  price: z.coerce.number({message:'Deve ser um número'}).min(1, {message:'Campo obrigatório'}),
  amount: z.coerce.number({message:'Deve ser um número'}).min(1,{message:'Campo obrigatório'}),
  assetIdentifier: z.string({message:'Campo obrigatório'}).min(2,{message:'Campo obrigatório'}),
})
type LoginFormData = z.infer<typeof LoginFormSchema>

export function PurchaseForm(props:PurchaseFormProps){
  const {updatePortfolio} = portfolioStore()

  const { portfolioId } = props
  const [loading,setLoading] = useState(false)
  
  const handleLogin:SubmitHandler<LoginFormData> = useCallback(async (dto:LoginFormData)=>{
    if (loading) return;

    setLoading(true)
    try {
      const response = await portfolioService.addPurchase(portfolioId, {
        assetIdentifier:dto.assetIdentifier,
        capital:dto.amount,
        price:dto.price
      })
      updatePortfolio(response)
      
      toast.success(`Compra cadastrada com sucesso!`);
    } catch (err) {
      const error:AppError = err as AppError

      if (error.response.status === 401) {
        toast.error('Credenciais incorretas');

      }else {
        toast.error('Ocorreu um erro inesperado');
      }
    }

    
    setLoading(false)
  },[loading, portfolioId])
  
  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<LoginFormData>({
    resolver:zodResolver(LoginFormSchema)
  })  

  return (
    <div className="bg-zinc-800 rounded p-4">
      <p className="text-lg text-zinc-500 mb-auto">Nova Compra</p>

      <form 
        className="flex flex-row gap-2 flex-wrap items-start"       
        onSubmit={handleSubmit(handleLogin)}
      >
      <Controller
          control={control}
          name="price"
          render={({ field }) => (
            <Input
              id='price'
              label="Preço" 
              placeholder="Preço"
              error={errors.price}
              haveError={!!errors.price}
              {...field} 
              type="number"
            />
          )}
        />
        <Controller
          control={control}
          name="amount"
          render={({ field }) => (
            <Input
              id='amount'
              label="Valor Investido" 
              placeholder="Valor Investido"
              error={errors.amount}
              haveError={!!errors.amount}
              {...field} 
            />
          )}
        />
        <Controller
          control={control}
          name="assetIdentifier"
          render={({ field }) => (
            <Input
              id='assetIdentifier'
              label="Asset" 
              placeholder="Asset"
              error={errors.assetIdentifier}
              haveError={!!errors.assetIdentifier}
              {...field} 
            />
          )}
        />
        <Button title="Salvar" className="ml-auto mt-6"/>
      </form>
    </div>
  )
}