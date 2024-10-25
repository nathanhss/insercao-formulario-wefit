import { Prisma } from '@prisma/client';
import prisma from "../../database/client";

const getForm = async (id: number) => {
    try {
        return await prisma.user.findFirst({
            where: {
                id
            },
            include: {
                Address: {
                    select: {
                        city: true,
                        neighborhood: true,
                        number: true,
                        state: true,
                        street: true,
                        zipcode: true,
                        complement: true,
                    }
                }
            }
        });
    } catch (error: any | Prisma.PrismaClientUnknownRequestError) {
        console.error(error.code);
        throw new Error(error.code);
    } finally {
        await prisma.$disconnect();
    }
}

export default getForm;