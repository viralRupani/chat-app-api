import { Field, InputType } from '@nestjs/graphql';
import {
    IsEmail,
    IsNotEmpty,
    IsPhoneNumber,
    Length,
    MaxLength,
} from 'class-validator';

@InputType()
export class RegisterUserDto {
    @Field()
    @IsNotEmpty()
    @Length(0, 20)
    first_name: string;

    @Field()
    @IsNotEmpty()
    @Length(0, 20)
    last_name: string;

    @Field({ nullable: true })
    @IsNotEmpty()
    @IsPhoneNumber('IN')
    phone_number: string;

    @Field()
    @IsNotEmpty()
    @IsEmail()
    @MaxLength(60)
    email: string;

    @Field()
    @IsNotEmpty()
    @MaxLength(20)
    username: string;

    @Field()
    @IsNotEmpty()
    password: string;

    @Field({ nullable: true })
    profile_url?: string;
}
