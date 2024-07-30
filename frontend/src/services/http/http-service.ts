import axios,  { AxiosInstance } from "axios";

// export const axiosInstance = axios.create({
//   baseURL: process.env.NEXT_PUBLIC_API_URL,
//   timeout: 5000,
// });


// type ErrorResponse = any
// type HttpMethod = 'get' | 'post' | 'put' | 'delete'

export class HttpService {
  private axiosInstance: AxiosInstance
  constructor(){
    this.axiosInstance = axios.create({
        baseURL: process.env.NEXT_PUBLIC_API_URL,
        timeout: 5000,

      })
  }

  async setAuthorization(token:string) {    
    this.axiosInstance.defaults.headers.Authorization = token
  }
  
  // private async httpRequest(method: HttpMethod, url: string, dto?: any) {
  //   try {
  //     const response = await this.axiosInstance[method](url, dto);
      
  //     return response;
  //   } catch (error) {
  //     return error as ErrorResponse
  //   }
  // }
  
  async get(url:string, options?:any){
    return await this.axiosInstance.get(url,options)
    // return this.httpRequest('get',url,options)
    
  }

  async post(url:string,data:any){
    return await this.axiosInstance.post(url,data)
    // return this.httpRequest('post',url,data)
  }

  async put(url:string,data:any){
    return await this.axiosInstance.put(url,data)
    // return this.httpRequest('put',url,data)
  }

  async delete(url:string){
    return await this.axiosInstance.delete(url)
    // return this.httpRequest('delete',url)
  }
}
const httpService = new HttpService() 

export default  httpService