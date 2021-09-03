import { Field, ObjectType } from '@nestjs/graphql';
import { CoreOutput } from 'src/common/dtos/output.dto';
import { Category } from '../entities/category.entity';

@ObjectType()
export class GetAllCategoriesOutput extends CoreOutput {
  @Field((type) => [Category])
  categories?: Category[];
}
