"use client"

import httpService from "@/services/http/http-service";
import { userStore } from "@/store/userStore";
import { useRouter } from "next/navigation";
import { ReactNode, useEffect, useState } from "react";
import LoadingPage from "../Loading";

type ProtectedRouteProps = {
  children: ReactNode
}

function ProtectedPage(props:ProtectedRouteProps) {
  const {children} = props
  const router = useRouter();
  const { user,token } = userStore()
  const [loading, setloading] = useState(true);

  useEffect(()=>{
    setloading(true)
    httpService.setAuthorization(`Bearer ${token}`)
    setloading(false)
  },[token])

  useEffect(()=>{
    if (!user) {
      router.push('/login')
    }
  },[user,router])

  if (loading) return <LoadingPage/>
  return children
}

export default ProtectedPage