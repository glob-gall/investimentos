import httpService, { HttpService } from '../http/http-service'
import {  CreatePortfolioDto,CreatePortfolioResponseDto } from './dto/create-portfolio.dto'
import { CreatePurchaseDto, CreatePurchaseResponseDto, RemovePurchaseResponseDto } from './dto/create-purchase.dto'
import { Portfolio } from './dto/portfolio.dto'
import { UpdatePortfolioDto } from './dto/update-portfolio.dto'

 export class PortfolioService {
  private httpService: HttpService
  constructor(){
    this.httpService = httpService
  }

  async create(dto: CreatePortfolioDto): Promise<CreatePortfolioResponseDto> {
   const response = await this.httpService.put('/users/add-portfolio',dto)
   return response.data
  }
  async update(id:string, dto: UpdatePortfolioDto): Promise<Portfolio> {
   const response = await this.httpService.put(`/portfolios/${id}`,dto)
   return response.data
  }

  async list(): Promise<Portfolio[]> {
   const response = await this.httpService.get('/portfolios')
   return response.data
  }

  async findBySlug(slug: string): Promise<Portfolio> {
   const response = await this.httpService.get(`/portfolios/${slug}`)
   return response.data
  }

  async delete(id: string): Promise<Portfolio> {
   const response = await this.httpService.delete(`/portfolios/${id}`)
   return response.data
  }

  async addPurchase(id:string ,dto: CreatePurchaseDto): Promise<Portfolio> {
   const response = await this.httpService.put(`/portfolios/${id}/add-purchase`,dto)
   return response.data
  }

  async removePurchase(id:string , purchaseId: string): Promise<Portfolio> {
   const response = await this.httpService.delete(
    `/portfolios/${id}/remove-purchase/${purchaseId}`,
  )
   return response.data
  }
  
}



export const portfolioService = new PortfolioService()