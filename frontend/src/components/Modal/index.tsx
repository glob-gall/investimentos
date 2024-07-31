import React, { ReactNode, useCallback } from "react";
import { Button, ButtonProps } from "../Button";
import { X } from "lucide-react";

type ConfirmButton = ButtonProps & {
  title:string
  onClick?:() => void
}
type CancelButton = ButtonProps & {
  title:string
  onClick?:() => void
}

type ModalProps = {
  title:string
  buttonProps: ButtonProps
  children: ReactNode
  confirm?: ConfirmButton
  cancel?: CancelButton
}
export function Modal(props:ModalProps) {
  const {title, buttonProps,cancel,confirm,children} = props

  const [showModal, setShowModal] = React.useState(false);

  const closeModal = useCallback(()=>{
    setShowModal(false)
  },[])
  const openModal = useCallback(()=>{
    setShowModal(true)
  },[])

  const handleSave = useCallback(()=>{
    setShowModal(false)
    if (confirm?.onClick) confirm?.onClick()
    
  },[confirm])

  const handleCancel = useCallback(()=>{
    setShowModal(false)
    if(cancel?.onClick) cancel?.onClick()
  },[cancel])

  return (
    <>
      <Button 
        className=""
        onClick={openModal}
        {...buttonProps}
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
                    {title}
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
                  {children}
                </div>
                {/*footer*/}
                <div className="flex gap-2 items-center justify-end rounded-b">
                  {cancel && (
                    <Button
                      type="button"
                      {...cancel}
                      onClick={handleCancel}
                    />
                  )}
                  {confirm && (
                    <Button
                      type="button"
                      {...confirm}
                      onClick={handleSave}
                    />
                  )}
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