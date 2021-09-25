import { Field, InputType, ObjectType } from '@nestjs/graphql';

import { CoreOutput } from 'src/apis/common/dtos/output.dto';
import { Like } from '../entities/likes.entity';

@ObjectType()
export class FindLikeListOutput extends CoreOutput {
  @Field((type) => Like, { nullable: true })
  likeList?: Like;
}
