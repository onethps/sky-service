import { PrismaClient } from '@prisma/client'
import * as dotent from 'dotenv'

dotent.config()
const prisma = new PrismaClient()
