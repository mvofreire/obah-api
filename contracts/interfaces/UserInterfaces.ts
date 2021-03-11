import User from 'App/Models/User'
import { MultipartFileContract } from '@ioc:Adonis/Core/BodyParser'
import UserImage from 'App/Models/UserImage'

export interface IUserService {
  create(data: Partial<User>): Promise<User>
  createClient(data: Partial<User>): Promise<User>
  createStore(data: Partial<User>): Promise<User>
  updateById(id: number, data: Partial<User>): Promise<User>
  loadAll(): Promise<User[]>
  loadAllStores(): Promise<User[]>
  loadAllClients(): Promise<User[]>
  loadStore(id: number): Promise<User | null>
  loadClient(id: number): Promise<User | null>
  loadOne(id: number): Promise<User>
  loadByEmail(email: string): Promise<User>
  destroyById(id: number): Promise<boolean>
  attachImage(userId: number, file: MultipartFileContract): Promise<UserImage>
  changeImage(userId: number, file: MultipartFileContract): Promise<User>
  createVoucher(userId: number, promotionId: number): Promise<boolean>
}
