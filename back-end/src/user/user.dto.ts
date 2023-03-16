import { IsEmail, IsOptional, IsString, MinLength } from 'class-validator'

export class UserDto {
	@IsEmail()
	email: string

	@IsOptional()
	@IsString()
	password?: string

	@IsOptional()
	@IsString()
	name?: string
}
