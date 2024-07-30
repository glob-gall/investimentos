"use client"
import { userStore } from "@/store/userStore";
import { useRouter } from "next/navigation";
import { useEffect } from "react";


function Home() {
  const {user} = userStore()
  const router = useRouter();

  useEffect(()=>{
    if (user) {
      router.push('/dashboard')
    } else {
      router.push('/login')
    }
  },[user,router])


  return (
    <h1>Loading</h1>
  )
}

export default Home