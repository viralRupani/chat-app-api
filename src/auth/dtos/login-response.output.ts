import { Field, ObjectType } from "@nestjs/graphql";
import { UsersEntity } from "src/users/entities/user.entity";

@ObjectType()
export class LoginResponse {
    @Field()
    access_token: string;

    @Field()
    refresh_token: string;

    @Field(() => UsersEntity)
    user: UsersEntity
}