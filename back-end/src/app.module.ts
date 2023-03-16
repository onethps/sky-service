import { PrismaService } from './prisma.service'
import { Module } from '@nestjs/common'
import { AppController } from './app.controller'
import { AppService } from './app.service'
import { AuthModule } from './auth/auth.module'
import { ConfigModule } from '@nestjs/config'
import { UserModule } from './user/user.module'
import { ProductModule } from './product/product.module'

@Module({
	imports: [ConfigModule.forRoot(), AuthModule, UserModule, ProductModule],
	controllers: [AppController],
	providers: [AppService, PrismaService]
})
export class AppModule {}
