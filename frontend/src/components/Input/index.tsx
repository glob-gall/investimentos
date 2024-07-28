
type InputProps = {
  name:string
  placeholder?:string
  label?:string
}

export function Input(props:InputProps) {
  const {name,label,placeholder} = props

  return (
    <div className="flex flex-col">
      <label 
        className="text-zinc-50"
        htmlFor={name}
      >
        {label}
      </label>
      <input 
        id={name} 
        placeholder={placeholder} 
        className="h-10 rounded pl-2 pt-1 pr-2 pb-1 placeholder-zinc-600 outline-none text-zinc-900"
      />
    </div>
  )
}
