import { PrismaService } from './../prisma.service'
import { Injectable } from '@nestjs/common'
import { NotFoundException } from '@nestjs/common/exceptions'

@Injectable()
export class ProductService {
	constructor(private prisma: PrismaService) {}
	async getAll() {
		const products = await this.prisma.products.findMany({})
		return products
	}

	async byId(id: string) {
		const product = await this.prisma.products.findUnique({
			where: {
				id
			}
		})

		if (!product) throw new NotFoundException('Product not found')

		return product
	}
}
