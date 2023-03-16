import { AuthDto } from './../auth/dto/auth.dto'
import { CurrentUser } from './../auth/decorators/user.decorator'
import { Body, Controller, Get } from '@nestjs/common'
import { Auth } from 'src/auth/decorators/auth.decorator'
import { UserService } from './user.service'
import {
	Post,
	Put
} from '@nestjs/common/decorators/http/request-mapping.decorator'
import { UsePipes } from '@nestjs/common/decorators/core/use-pipes.decorator'
import { ValidationPipe } from '@nestjs/common/pipes'
import { HttpCode } from '@nestjs/common/decorators/http/http-code.decorator'
import { UserDto } from './user.dto'

@Controller('user')
export class UserController {
	constructor(private readonly userService: UserService) {}

	@Get('profile')
	@Auth()
	async getProfile(@CurrentUser('id') id: string) {
		return this.userService.byId(id)
	}

	@UsePipes(new ValidationPipe())
	@HttpCode(200)
	@Auth()
	@Put('profile')
	async getNewTokens(@CurrentUser('id') id: string, @Body() dto: UserDto) {
		return this.userService.updateProfile(id, dto)
	}
}
