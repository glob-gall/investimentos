import { LoginDto, LoginResponseDto } from './dto/login.dto'
import httpService, { HttpService } from '../http/http-service'

 export class AuthService {
  private httpService: HttpService
  constructor(){
    this.httpService = httpService
  }

  async login(dto: LoginDto):Promise<LoginResponseDto> {

    const response = await this.httpService.post('/auth', dto)
    return response.data

  }
}



export const authService = new AuthService()