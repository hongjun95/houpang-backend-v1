import { Field, InputType, ObjectType } from '@nestjs/graphql';

import { CoreOutput } from 'src/common/dtos/output.dto';
import { Like } from '../entities/likes.entity';

@InputType()
export class FindLikeListInput {
  @Field((type) => String)
  likeListId: string;
}

@ObjectType()
export class FindLikeListOutput extends CoreOutput {
  @Field((type) => Like, { nullable: true })
  likeList?: Like;
}
