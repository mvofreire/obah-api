import Promotion from 'App/Models/Promotion'
import User from 'App/Models/User'
import { VoucherDTO } from 'Contracts/Dtos/voucher/VoucherDTO'

export interface IUserPromotion {
  loadParticipantsByPromotion(promotionId: number): Promise<User[]>
  loadPromotionsByClient(clientId: number): Promise<Promotion[]>
  loadVouchersByClient(clientId: number): Promise<VoucherDTO[]>
  loadVoucherById(id: number): Promise<VoucherDTO>
}
