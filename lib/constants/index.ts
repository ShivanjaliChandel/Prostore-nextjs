export const APP_NAME = process.env.NEXT_PUBLIC_APP_NAME || 'NEXTJSNEW';
export const APP_DESCRIPTION = 
process.env.NEXT_PUBLIC_APP_DESCRIPTION || 'a modrn';
export const LATEST_PRODUCT_LIMIT = Number(process.env.LATEST_PRODUCT_LIMIT )|| 6;

export const signInDefaultValues = {
    email:'',
    password:'',
}