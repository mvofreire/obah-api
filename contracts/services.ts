declare module '@ioc:Services/PromotionService' {
  import { IPromotionService } from 'Contracts/interfaces/PromotionInterfaces'

  const PromotionServiceInterface: IPromotionService
  export default PromotionServiceInterface
}

declare module '@ioc:Services/UserService' {
  import { IUserService } from 'Contracts/interfaces/UserInterfaces'

  const serviceInterface: IUserService
  export default serviceInterface
}

declare module '@ioc:Services/UserPromotionService' {
  import { IUserPromotion } from 'Contracts/interfaces/UserPromotionInterface'

  const serviceInterface: IUserPromotion
  export default serviceInterface
}

declare module '@ioc:Utils/FileUpload' {
  import { IFileUpload } from 'Contracts/interfaces/FileUploadInterface'

  const serviceInterface: IFileUpload
  export default serviceInterface
}