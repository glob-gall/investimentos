import { Button } from "@/components/Button";
import { Input } from "@/components/Input";

export function PurchaseForm(){
  return (
    <div className="bg-zinc-800 rounded p-4">
      <p className="text-lg text-zinc-500 mb-auto">Nova Compra</p>

      <div className="flex flex-row gap-2 items-end flex-wrap">
        <Input name="price" label="Preço" placeholder="Preço"/>
        <Input name="amount" label="Valor Investido" placeholder="Valor Investido"/>
        <Input name="asset" label="Asset" placeholder="Asset"/>
        <Button title="Salvar" className="ml-auto"/>
      </div>
    </div>
  )
}