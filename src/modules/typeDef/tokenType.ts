import {Field, ObjectType} from "type-graphql";

@ObjectType()
export class TokenTypeDefs {
  @Field()
  id: string ;

  @Field({nullable: true})
  name: string;

  @Field({nullable: true})
  symbol: string;

  @Field({nullable: true})
  address: string;

  @Field()
  amount: number
}