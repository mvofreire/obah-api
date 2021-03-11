import User from 'App/Models/User'
import { IUserService } from 'Contracts/interfaces/UserInterfaces'
import Hash from '@ioc:Adonis/Core/Hash'
import { MultipartFileContract } from '@ioc:Adonis/Core/BodyParser'
import { FileUploadDTO } from 'Contracts/Dtos/promotion/FileUploadDTO'
import FileUpload from '@ioc:Utils/FileUpload'
import { USER_TYPE } from 'App/Enums/User'
import UserImage from 'App/Models/UserImage'
import { DateTime } from 'luxon'

export class UserService implements IUserService {
  public async loadStore(id: number): Promise<User | null> {
    const query = User.query()

    query.whereColumn('id', id.toString())
    query.whereColumn('type', USER_TYPE.Store)

    return query.first()
  }

  public async loadClient(id: number): Promise<User | null> {
    const query = User.query()

    query.whereColumn('id', id.toString())
    query.whereColumn('type', USER_TYPE.Client)

    return query.first()
  }

  public async createClient(data: Partial<User>): Promise<User> {
    return this.create({
      ...data,
      type: USER_TYPE.Client,
    })
  }

  public async createStore(data: Partial<User>): Promise<User> {
    return this.create({
      ...data,
      type: USER_TYPE.Store,
    })
  }

  public async create(data: Partial<User>): Promise<User> {
    const { password, ...rest } = data
    const _password = await Hash.make(password as string)
    return User.create({
      ...rest,
      password: _password,
    })
  }

  public async updateById(id: number, data: Partial<User>): Promise<User> {
    const { type, ...rest } = data
    const model = await this.loadOne(id)
    model.merge(rest)
    return model.save()
  }

  public async loadAll(): Promise<User[]> {
    return User.query().preload('images')
  }

  public async loadAllClients() {
    return User.query().where('type', USER_TYPE.Client)
  }

  public async loadAllStores() {
    return User.query().preload('images').where('type', USER_TYPE.Store)
  }

  public async loadOne(id: number): Promise<User> {
    return User.findOrFail(id)
  }

  public async destroyById(id: number): Promise<boolean> {
    try {
      const model = await this.loadOne(id)
      model.delete()
      return true
    } catch (error) {
      return false
    }
  }

  public async attachImage(userId: number, file: MultipartFileContract): Promise<UserImage> {
    const model = await this.loadOne(userId)
    const { size, clientName, tmpPath, type, subtype } = file
    const fileUpload: FileUploadDTO = await FileUpload.uploadImage(
      tmpPath as string,
      `${type}/${subtype}`
    )
    return await model.related('images').create({
      filename: clientName,
      size,
      path: fileUpload.Location,
      config: fileUpload,
    })
  }

  public async changeImage(userId: number, file: MultipartFileContract): Promise<User> {
    const model = await this.loadOne(userId)
    const { tmpPath, type, subtype } = file
    const fileUpload: FileUploadDTO = await FileUpload.uploadImage(
      tmpPath as string,
      `${type}/${subtype}`
    )
    model.image = fileUpload.Location
    return model.save()
  }

  public async loadByEmail(email: string): Promise<User> {
    const model = await User.findByOrFail('email', email)
    return model
  }

  public async createVoucher(userId: number, promotionId: number): Promise<boolean> {
    try {
      const user = await this.loadOne(userId)
      await user.related('vouchers').create({
        expiration: DateTime.now().plus({ day: 1 }),
        promotionId,
      })
      return true
    } catch (error) {
      console.log(error)
      return false
    }
  }
}
