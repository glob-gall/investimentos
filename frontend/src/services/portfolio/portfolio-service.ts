import httpService, { HttpService } from '../http/http-service'
import {  CreatePortfolioDto,CreatePortfolioResponseDto } from './dto/create-portfolio.dto'
import { Portfolio } from './dto/portfolio.dto'

 export class PortfolioService {
  private httpService: HttpService
  constructor(){
    this.httpService = httpService
  }

  async create(dto: CreatePortfolioDto): Promise<CreatePortfolioResponseDto> {
   const response = await this.httpService.put('/users/add-portfolio',dto)
   return response.data
  }

  async list(): Promise<Portfolio[]> {
   const response = await this.httpService.get('/portfolios','')
   return response.data
  }
}



export const portfolioService = new PortfolioService()