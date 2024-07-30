export type AppError = {
  code:string,
  config:{
    baseURL:string,
    data:string
    headers:any
    method:'post'|'get'|'put'|'delete'  
  },
  message:string,
  name:string,
  request:any,
  response:{
    config:any,
    status:number
    statusText:string
    data:{
      error:string,
      message:string,
      statusCode:number
    }
  }

} 