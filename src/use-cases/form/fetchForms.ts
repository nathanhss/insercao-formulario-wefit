import { Prisma } from "@prisma/client";
import prisma from "../../database/client";

const fetchForms = async () => {
    try {
        return await prisma.user.findMany({
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

export default fetchForms;