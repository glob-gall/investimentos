import { ChangeEvent, ComponentProps, useState } from 'react';
import { FieldError } from 'react-hook-form';
import { tv, VariantProps } from 'tailwind-variants';
import { Input, InputProps } from '../Input';


type InputMoneyProps = InputProps & {
}

export function InputMoney(props:InputMoneyProps) {
  const {id,label,placeholder,error,haveError, className,value,onChange, ...rest} = props
  // const [value, setValue] = useState('');
  // const setValue = onChange 

  const formatMonetaryValue = (value:string) => {
    const cleanValue = Number(value.replace(/[^\d]/g, ''));
    const formattedValue = new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL',
    }).format(cleanValue / 100);
    return formattedValue;
  };

  const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    const inputValue = event.target.value;
    const formattedValue = formatMonetaryValue(inputValue);
    if(onChange){
      onChange({target:{value:formattedValue}} as ChangeEvent<HTMLInputElement>);
    }
  };

  return (
    <Input 
      {...rest}
      error={error}
      haveError={haveError}
      id={id}
      label={label}
      value={value}
      placeholder='R$ 0,00'
      onChange={handleInputChange}
    />
  )
}
{/* <CurrencyInput
      id="input-example"
      name="input-name"
      placeholder="Please enter a number"
      defaultValue={0}
      decimalsLimit={2}
      onValueChange={(value, name, values) => console.log(value, name, values)}
    /> */}