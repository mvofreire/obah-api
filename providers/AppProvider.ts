import { ApplicationContract } from '@ioc:Adonis/Core/Application'

export default class AppProvider {
  public static needsApplication = true

  constructor(protected app: ApplicationContract) {}

  private registerServices() {
    this.app.container.singleton('Services/PromotionService', () => {
      const { PromotionService } = require('../app/Services/PromotionService')
      return new PromotionService()
    })

    this.app.container.singleton('Services/UserService', () => {
      const { UserService } = require('../app/Services/UserService')
      return new UserService()
    })

    this.app.container.singleton('Services/UserPromotionService', () => {
      const { UserPromotionService } = require('../app/Services/UserPromotionService')
      return new UserPromotionService()
    })

    this.app.container.singleton('Utils/FileUpload', () => {
      const { FileUpload } = require('../app/Utils/FileUpload')
      return new FileUpload()
    })
  }

  public register() {
    // Register your own bindings
    this.registerServices()
  }

  public async boot() {
    // IoC container is ready
  }

  public async ready() {
    // App is ready
  }

  public async shutdown() {
    // Cleanup, since app is going down
  }
}
