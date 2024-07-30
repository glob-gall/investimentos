import { LoaderCircle } from "lucide-react"
import { ComponentProps } from "react"
import { tv, VariantProps } from 'tailwind-variants'


const buttonVariats = tv({
  base:" h-10 justify-center rounded py-1 px-2  duration-200 items-center flex flex-row",
  variants: {
    color: {
      basic:'bg-zinc-50 hover:bg-zinc-200',
      primary:'bg-green-500 hover:bg-green-600 text-zinc-900 hover:border-green-600',
      danger:'bg-red-500 hover:bg-red-600 text-zinc-50 hover:border-red-600',
      secondary:'bg-transparent hover:bg-green-500 border-green-500 border text-green-500 hover:text-zinc-900'
    },
    loading: {
      true:'cursor-not-allowed bg-zinc-400 hover:bg-zinc-400 text-zinc-600',
      false:'',
    }
  },
  defaultVariants: {
    color:'primary',
    loading: false
  }
})

type ButtonProps = ComponentProps<'button'> & 
  VariantProps<typeof buttonVariats> & {
  title:string
}

export function Button(props:ButtonProps) {
  const {title,loading,className,color,...rest} = props
  
  return (
      <button 
        {...rest}
        className={buttonVariats({color,loading,className})}
      >
        {loading && (
        <div className=" animate-spin delay-700 mr-1">
          <LoaderCircle />
        </div>
        )}
        <p className="font-semibold text-center">
          {title}
        </p>
      </button>
  )
}
 
