import React, { useCallback, useState } from "react";
import { X } from "lucide-react";
import { Button, ButtonProps } from "@/components/Button";
import { Input } from "@/components/Input";
import { Controller, SubmitHandler, useForm } from "react-hook-form";
import { z } from "zod";
import { AppError } from "@/services/http/dto/app-error";
import { toast } from "react-toastify";
import { zodResolver } from "@hookform/resolvers/zod";
import { portfolioService } from "@/services/portfolio/portfolio-service";
import { portfolioStore } from "@/store/portfolioStore";

const PortfolioFormSchema = z.object({
  title: z.string({message:'Campo obrigatório'}).min(1,{message:'Campo obrigatório'}),
})
type PortfolioFormData = z.infer<typeof PortfolioFormSchema>

type PortfolioFormModalProps = {
  buttonProps:ButtonProps
}
export function PortfolioFormModal(props:PortfolioFormModalProps) {
  const {setPortfolios} = portfolioStore()
  const {buttonProps} = props
  const [loading, setLoading] = useState(false)
  const [showModal, setShowModal] = React.useState(false);

  const closeModal = useCallback(()=>{setShowModal(false)},[])
  const openModal = useCallback(()=>{setShowModal(true)},[])

  const {
    handleSubmit,
    control,
    setValue,
    formState: { errors },
  } = useForm<PortfolioFormData>({
    resolver:zodResolver(PortfolioFormSchema)
  })  

  const handleLogin:SubmitHandler<PortfolioFormData> = useCallback(async (dto:PortfolioFormData)=>{
    if (loading) return;

    try {
      setLoading(true)
      const response = await portfolioService.create(dto)
      console.log(response);
      setPortfolios(response.portfolios)
      
      toast.success(`Carteira ${dto.title} criada com sucesso!`);
      setValue("title",'')
    } catch (err) {
      const error = err as AppError
      if (error.response.status === 401) {
        toast.error('Credenciais incorretas');

      }else {
        toast.error('Ocorreu um erro inesperado');
      }
    }
    
    setLoading(false)
  },[loading, setPortfolios,setValue])

  return (
    <>
      <Button
        {...buttonProps}
        onClick={openModal}
      />

      {showModal ? (
        <>
          <div
            className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none"
          >
            <div className="relative w-auto my-6 mx-auto max-w-3xl">
              {/*content*/}
              <div className="p-3 border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-zinc-800 outline-none focus:outline-none">
                {/*header*/}
                <div className="flex justify-between  rounded-t">
                  <h3 className="text-2xl font-semibold text-zinc-50 mt-2">
                    Nova Carteira
                  </h3>
                  <button
                    className="p-1  rounded-md duration-200 hover:bg-zinc-700 ml-2 mb-2"
                    onClick={closeModal}
                  >
                    <span className="text-zinc-500">
                      <X/>
                    </span>
                  </button>
                </div>
                {/*body*/}
                <div className="relative py-4 flex-auto">

                <form onSubmit={handleSubmit(handleLogin)} className="mt-4">
                  <Controller
                    control={control}
                    name="title"
                    render={({ field }) => (
                      <Input
                        id='title'
                        label="Titulo" 
                        placeholder="Titulo"
                        error={errors.title}
                        haveError={!!errors.title}
                        {...field} 
                      />
                    )}
                  />
                {/*footer*/}
                  <div className="flex gap-2 items-center justify-end rounded-b mt-4">
                    <Button
                        type="button"
                        color="danger"
                        onClick={closeModal}
                        title="Cancelar"
                      />
                    <Button
                        type="submit"
                        title="Salvar"
                    />
                  </div>
                </form>

                </div>
              </div>
            </div>
          </div>
          <div className="opacity-25 fixed inset-0 z-40 bg-black"></div>
        </>
      ) : null}
    </>
  );
}