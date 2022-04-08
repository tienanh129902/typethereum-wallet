import {Field, ObjectType} from "type-graphql";

@ObjectType()
export class UserTypeDefs {
    @Field()
    id: string ;

    @Field({nullable: true})
    name: string;

    @Field({nullable: true})
    email: string;

    @Field({nullable: true})
    accountID: string;
}