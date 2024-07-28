import Image from "next/image"
import RegisterForm from "./RegisterForm"


function Register() {
  return (
    <div className="flex bg-zinc-700 h-screen">
      <RegisterForm/>

      <div className="bg-green-500 flex-1 h-screen overflow-hidden">
        <Image
          className="h-full w-full min-w-max object-right"
          src='/images/bg-login.png'
          alt="background-yellow"
          width={2296} 
          height={2544} 
        />
      </div>
    </div>
  )
}
export default Register