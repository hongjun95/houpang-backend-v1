import { EntityRepository, Repository } from 'typeorm';
import { Category } from '../entities/category.entity';

@EntityRepository(Category)
export class CategoryRepository extends Repository<Category> {
  async findOneBySlugUsingName(name: string) {
    const categoryName = name.trim().toLowerCase();
    const slug = categoryName.replace(/ /g, '-');

    const category = await this.findOne({ slug });

    if (!category) {
      return undefined;
    }
    return category;
  }
}
