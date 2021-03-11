import BaseSeeder from '@ioc:Adonis/Lucid/Seeder'
import Tag from 'App/Models/Tag'

export default class PopulateTagSeeder extends BaseSeeder {
  data = ['Cerveja', 'Chopp', 'Batatinhas', 'Beber', 'Sair', 'Jantar', 'Zueira']

  public async run() {
    await Tag.createMany(this.data.map((name) => ({ name })))
  }
}
