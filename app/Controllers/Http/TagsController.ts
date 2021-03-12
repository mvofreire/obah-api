import Tag from 'App/Models/Tag'

export default class TagsController {
  public async index() {
    return await Tag.all()
  }
}
