import { ComponentProps } from "react"
import { FieldError } from "react-hook-form"
import { tv, VariantProps } from "tailwind-variants"

const inputVariats = tv({
  base:"h-10 rounded pl-2 pt-1 pr-2 pb-1 placeholder-zinc-600 outline-none text-zinc-900 border-2",
  variants: {
    haveError: {
      true:'border-2 border-red-400',
      false:'',
    }
  },
  defaultVariants: {
    haveError:false
  }
})

export type InputProps = ComponentProps<'input'> & 
VariantProps<typeof inputVariats> & {
  placeholder?:string
  label?:string,
  error?: FieldError
  id?:string
}

export function Input(props:InputProps) {
  const {id,label,placeholder,error,haveError, className, ...rest} = props

  return (
    <div className="flex flex-col">
      <label 
        className="text-zinc-50"
        htmlFor={id}
      >
        {label}
      </label>
      <input 
        id={id}
        placeholder={placeholder} 
        className={inputVariats({haveError,className})}
        {...rest}
      />
      {error && <span className="text-red-400 text-xs">{error.message}</span>}
    </div>
  )
}
