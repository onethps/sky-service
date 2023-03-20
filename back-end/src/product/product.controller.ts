import { Controller, Get, Param } from '@nestjs/common'
import { Auth } from 'src/auth/decorators/auth.decorator'

import { ProductService } from './product.service'

@Controller('product')
export class ProductController {
	constructor(private readonly productService: ProductService) {}

	@Get()
	// @Auth()
	async getAll() {
		return this.productService.getAll()
	}

	@Get(':id')
	@Auth()
	async getById(@Param('id') id: string) {
		return this.productService.byId(id)
	}
}
