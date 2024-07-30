import httpService, { HttpService } from '../http/http-service'
import { CreateUserDto, CreateUserResponseDto } from './dto/create-user.dto'

 export class UserService {
  private httpService: HttpService
  constructor(){
    this.httpService = httpService
  }

  async create(dto: CreateUserDto): Promise<CreateUserResponseDto> {
   const response = await this.httpService.post('/users',dto)
   return response.data
  }
}



export const userService = new UserService()