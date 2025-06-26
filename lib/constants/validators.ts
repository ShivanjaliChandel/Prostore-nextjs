import {z} from 'zod';
import { formatNumberWithDecimal } from '../utils';
const currency = z
    .string()
    .refine((value)=>/^\d+(\.\d{2})?$/.test(formatNumberWithDecimal(Number(value))),
'price must have exactly two decimal places')

//schema for inserting products 
export const insertProductSchema = z.object({
    name: z.string().min(3, 'Name must be atleast 3 characterstics'),
    slug: z.string().min(3, 'Name must be atleast 3 characterstics'),
    images:z.array(z.string()).min(1, 'product must have aleast one image'),
    isFeatured: z.boolean(),
    price:currency,
});

//schema for signing user in 

export const signInFormSchema = z.object({
    email: z.string().email('Invalid emial address'),
    password:z.string().min(6,'password must be atleast 6 characters'),
})

