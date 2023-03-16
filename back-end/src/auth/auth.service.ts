import { AuthDto } from './dto/auth.dto'
import { PrismaService } from '../prisma.service'
import {
	BadRequestException,
	Injectable,
	NotFoundException,
	UnauthorizedException
} from '@nestjs/common'
import { faker } from '@faker-js/faker'
import { JwtService } from '@nestjs/jwt'
import { users } from '@prisma/client'
import { hash, verify } from 'argon2'

@Injectable()
export class AuthService {
	constructor(private prisma: PrismaService, private jwt: JwtService) {}

	async login(dto: AuthDto) {
		const user = await this.validateUser(dto)
		const tokens = await this.issueTokens(user.id)

		return {
			user: this.returnUserFields(user),
			...tokens
		}
	}

	async getNewTokens(refreshToken: string) {
		console.log(refreshToken)
		const result = await this.jwt.verifyAsync(refreshToken)

		if (!result) throw new UnauthorizedException('Invalid refresh token')

		const user = await this.prisma.users.findUnique({
			where: {
				id: result.id
			}
		})

		const tokens = await this.issueTokens(user.id)

		return {
			user: this.returnUserFields(user),
			...tokens
		}
	}

	async register(dto: AuthDto) {
		const existingUser = await this.prisma.users.findUnique({
			where: {
				email: dto.email
			}
		})

		if (existingUser) throw new BadRequestException('User already exists')

		const user = await this.prisma.users.create({
			data: {
				email: dto.email,
				name: faker.name.firstName(),
				password: await hash(dto.password)
			}
		})

		const tokens = await this.issueTokens(user.id)

		return {
			user: this.returnUserFields(user),
			...tokens
		}
	}

	private async issueTokens(userId: string) {
		const data = { id: userId }

		const accessToken = this.jwt.sign(data, {
			expiresIn: '1h'
		})
		const refreshToken = this.jwt.sign(data, {
			expiresIn: '7d'
		})

		return { accessToken, refreshToken }
	}

	private returnUserFields(user: users) {
		return {
			id: user.id,
			email: user.email
		}
	}

	private async validateUser(dto: AuthDto) {
		const user = await this.prisma.users.findUnique({
			where: {
				email: dto.email
			}
		})

		if (!user) throw new NotFoundException('User not found')

		const isValidPassword = await verify(user.password, dto.password)

		if (!isValidPassword)
			throw new UnauthorizedException('Email or Password Incorrect')

		return user
	}
}
