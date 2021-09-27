import { Field, InputType, Int, ObjectType } from '@nestjs/graphql';
import { CoreOutput } from './output.dto';

@InputType()
export class PaginationInput {
  @Field((type) => Int, { defaultValue: 1 })
  page?: number;
}

@ObjectType()
export class PaginationOutput extends CoreOutput {
  @Field((type) => Int, { nullable: true })
  totalPages?: number;

  @Field((type) => Int, { nullable: true })
  totalResults?: number;

  @Field((type) => Int, { nullable: true })
  prevtPage?: number;

  @Field((type) => Boolean, { nullable: true })
  hasPrevtPage?: boolean;

  @Field((type) => Int, { nullable: true })
  nextPage?: number;

  @Field((type) => Boolean, { nullable: true })
  hasNextPage?: boolean;
}
