import { userStore } from "@/store/userStore";
import { useRouter } from "next/navigation";
import { ReactNode, useEffect } from "react";

type ProtectedRouteProps = {
  children: ReactNode
}

function ProtectedPage(props:ProtectedRouteProps) {
  const {children} = props
  const router = useRouter();
  const { user } = userStore()

  useEffect(()=>{
    if (!user) {
      router.push('/login')
    }
  },[user,router])

  return children
}

export default ProtectedPage