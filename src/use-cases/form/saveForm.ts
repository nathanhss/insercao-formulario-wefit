import { Prisma } from '@prisma/client';
import prisma from "../../database/client";

type FormType = {
    addresNumber: string,
    cellPhone: string,
    city: string,
    complement?: string | undefined,
    confirmEmail: string,
    document: string,
    email: string,
    fullName: string,
    legalEntity: number,
    neighborhood: string,
    phone?: string | undefined,
    state: string,
    street: string,
    terms: boolean,
    zipCode: string,
}; 

const saveForm = async (data: FormType) => {
    try {
        const result = await prisma.$transaction(async (prisma) => {
            const address = await prisma.address.create({
                data: {
                    city: data.city,
                    neighborhood: data.neighborhood,
                    number: data.addresNumber,
                    state: data.state,
                    street: data.street,
                    zipcode: data.zipCode,
                    complement: data.complement,
                }
            });

            const user = await prisma.user.create({
                data: {
                    cellPhone: data.cellPhone,
                    document: data.document,
                    email: data.email,
                    name: data.fullName,
                    phone: data.phone,
                    legalEntity: data.legalEntity == 1,
                    addressId: address.id,
                }
            });

            return { address, user };
        });

        return result;
    } catch (error: any | Prisma.PrismaClientUnknownRequestError) {
        console.error(error.code);
        throw new Error(error.code);
    } finally {
        await prisma.$disconnect();
    }
}

export default saveForm;