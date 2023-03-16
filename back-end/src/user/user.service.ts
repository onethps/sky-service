import { hash } from 'argon2'
import { UserDto } from './user.dto'
import { PrismaService } from './../prisma.service'
import { Injectable } from '@nestjs/common'
import { BadRequestException } from '@nestjs/common/exceptions'

@Injectable()
export class UserService {
	constructor(private prisma: PrismaService) {}

	async byId(id: string) {
		const user = await this.prisma.users.findUnique({
			where: {
				id
			}
		})

		if (!user) throw Error('User not found')

		return user
	}

	async updateProfile(id: string, dto: UserDto) {
		const isEmailExists = await this.prisma.users.findUnique({
			where: {
				email: dto.email
			}
		})

		if (isEmailExists && id !== isEmailExists.id) {
			throw new BadRequestException('Email уже занят')
		}

		const user = await this.byId(id)

		const updatedUser = await this.prisma.users.update({
			where: {
				id
			},
			data: {
				...dto,
				password: dto.password ? await hash(dto.password) : user.id
			}
		})

		return updatedUser
	}
}
