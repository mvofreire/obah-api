import Promotion from 'App/Models/Promotion'
import PromotionImage from 'App/Models/PromotionImage'
import { MultipartFileContract } from '@ioc:Adonis/Core/BodyParser'
import { ExtractModelRelations } from '@ioc:Adonis/Lucid/Relations'
import { PROMOTION_STATUS } from 'App/Enums/Promotion'

export interface IPromotionService {
  create(clientId: number, data: any): Promise<Promotion>
  updateById(id: number, data: any): Promise<Promotion>
  destroy(id: number)
  loadByClient(
    clientId: number,
    includes?: ExtractModelRelations<Promotion>[]
  ): Promise<Promotion[]>
  loadById(id: number): Promise<Promotion>
  loadByStatus(status: PROMOTION_STATUS): Promise<Promotion[]>
  attachImage(id: number, file: MultipartFileContract): Promise<PromotionImage>
  loadHighligthPromotions(): Promise<Promotion[]>
  loadExplorePromotions(): Promise<Promotion[]>
  loadPopularPromotions(): Promise<Promotion[]>
}
