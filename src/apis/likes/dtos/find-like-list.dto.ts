import { Field, ObjectType } from '@nestjs/graphql';

import { CoreOutput } from '@apis/common/dtos/output.dto';
import { Like } from '@apis/likes/entities/likes.entity';

@ObjectType()
export class FindLikeListOutput extends CoreOutput {
  @Field((type) => Like, { nullable: true })
  likeList?: Like;
}
