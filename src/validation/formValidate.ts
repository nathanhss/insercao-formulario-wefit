import {cnpj, cpf} from 'cpf-cnpj-validator'

import { z } from 'zod';

const formSchema = z.object({
    addresNumber: z.string(),
    cellPhone: z.string(),
    city: z.string(),
    complement: z.string().optional(),
    confirmEmail: z.string(),
    document: z.string(),
    email: z.string().email(),
    fullName: z.string(),
    legalEntity: z.number(),
    neighborhood: z.string(),
    phone: z.string().optional(),
    state: z.string(),
    street: z.string(),
    terms: z.boolean(),
    zipCode: z.string(),
})
.refine(data => data.email === data.confirmEmail, {
    message: "Emails must match",
    path: ["email", "confirmEmail"],
})
.refine(data => data.terms === true, {
    message: "You must accept the terms to proceed",
    path: ["terms"],
})
.refine(data => {
        if (data.legalEntity === 0) {
            return cpf.isValid(data.document);
        } else if (data.legalEntity === 1) {
            return cnpj.isValid(data.document);
        }

        return false;
    }, {
    message: "Invalid document for the selected legalEntity",
    path: ["document"],
});

const getSchema = z.object({
    id: z.string().transform((val) => {
        const number = parseFloat(val);
        if (isNaN(number)) {
            throw new Error("Invalid number format");
        }
        return number;
    })
});

export default { 
    formSchema,
    getSchema 
};