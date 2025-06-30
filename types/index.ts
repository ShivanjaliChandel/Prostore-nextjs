import {z} from 'zod';
import { insertProductSchema , insertcartSchema, cartItemSchema} from '@/lib/constants/validators';
export type Product = z.infer<typeof insertProductSchema> & {
    id:string;
    rating:string;
    brand:string;
    stock: number;
    price: string | number;
    slug: string;
    name: string;
    images: string[];
    createdAt:Date;
     
};

export type Cart = z.infer<typeof insertcartSchema> ;
export type CartItem = z.infer<typeof cartItemSchema> ;