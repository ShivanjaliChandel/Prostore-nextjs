export const APP_NAME = process.env.NEXT_PUBLIC_APP_NAME || 'NEXTJSNEW';
export const APP_DESCRIPTION = 
process.env.NEXT_PUBLIC_APP_DESCRIPTION || 'a modrn';
export const LATEST_PRODUCT_LIMIT = Number(process.env.LATEST_PRODUCT_LIMIT )|| 6;

export const signInDefaultValues = {
    email:'',
    password:'',
}

export const signUpDefaultValues = {
    name:'',
    email:'',
    password:'',
    confirmPassword:'',
}

export const shippingAddressDefaultValues = {
    fullName:'John Doe',
    address:'123 Main St',
    city:'New York',
    postalCode:'10001',
    country:'United States',
    lat:40.7128,
    lng:-74.0060,
}