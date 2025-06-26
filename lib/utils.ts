// import { Decimal } from "@prisma/client/runtime/library";
import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"
import { object } from "zod"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}


// convrt prisma object into regular js object
// export function convertToPlainObject<T>(value: T):T{
// return JSON.parse(JSON.stringify(value));
// }

//format number with decimal places

// export function formatNumberWithDecimal(num:number):string{
//  const [] = num.toString().split('.');
// return decimal? `${int}.${decimal.padEnd(2,'0')` : `${int}.00`
//  }

//format errors
//eslint-disable-next-line @typescript-eslint/no-explicit-any
export async function formatError(error:any) {
if(error.name==='ZodErrpr'){
//handle zod error
const fieldErrors = Object.keys(error.errors).map((field)=>error.errors[field].message);
return fieldErrors.join('. ');
}else if(error.name === 'PrismaClientKnownRequestError' && error.code === 'P2002'){
  //handle zod error
}else{
  //handle other errors
}
  
}