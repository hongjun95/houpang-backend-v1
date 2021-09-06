import { Field, InputType, ObjectType } from '@nestjs/graphql';

import { CoreOutput } from 'src/common/dtos/output.dto';
import { FavList } from '../entities/favList.entity';

@InputType()
export class FindDipsListInput {
  @Field((type) => String)
  favListId: string;
}

@ObjectType()
export class FindDipsListOutput extends CoreOutput {
  @Field((type) => FavList, { nullable: true })
  favList?: FavList;
}
