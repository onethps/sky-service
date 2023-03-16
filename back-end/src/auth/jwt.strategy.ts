import { PrismaService } from './../prisma.service'
import { ConfigService } from '@nestjs/config'
import { PassportStrategy } from '@nestjs/passport'
import { ExtractJwt, Strategy } from 'passport-jwt'
import { Injectable } from '@nestjs/common'
import { users } from '@prisma/client'

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
	constructor(
		private configService: ConfigService,
		private prisma: PrismaService
	) {
		super({
			jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
			ignoreExpiration: true,
			secretOrKey: configService.get<string>('JWT_SECRET')
		})
	}

	async validate({ id }: Pick<users, 'id'>) {
		return this.prisma.users.findUnique({
			where: {
				id: id
			}
		})
	}
}

export interface JwtPayload {
	login: string
}
