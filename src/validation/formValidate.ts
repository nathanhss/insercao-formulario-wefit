import { z } from 'zod';

const formSchema = z.object({
    addresNumber: z.string(),
    cellPhone: z.string(),
    city: z.string(),
    complement: z.string().optional(),
    confirmEmail: z.string(),
    document: z.string(),
    email: z.string(),
    fullName: z.string(),
    legalEntity: z.number(),
    neighborhood: z.string(),
    phone: z.string().optional(),
    state: z.string(),
    street: z.string(),
    terms: z.boolean(),
    zipCode: z.string(),
})
.refine(data => data.terms === true, {
    message: "You must accept the terms to proceed",
    path: ["terms"],
})
.refine(data => {
    const documentLength = data.document.length;
        if (data.legalEntity === 0 && documentLength !== 11) {
        return false;
        }
        if (data.legalEntity === 1 && documentLength !== 14) {
            return false;
        }
        return true;
    }, {
    message: "Invalid document length for the selected legalEntity",
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