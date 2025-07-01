// import { Decimal } from "@prisma/client/runtime/library";
import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

// format errors
export async function formatError(error: unknown): Promise<string> {
  if (error && typeof error === 'object' && 'name' in error) {
    if (error.name === 'ZodError' && 'errors' in error) {
      // handle zod error
      const zodError = error as { errors: Array<{ message: string }> };
      const fieldErrors = zodError.errors.map((err) => err.message);
      return fieldErrors.join('. ');
    } else if (error.name === 'PrismaClientKnownRequestError' && 'code' in error) {
      // handle prisma error
      const prismaError = error as { code: string };
      if (prismaError.code === 'P2002') {
        return 'A record with this information already exists';
      }
    }
  }
  
  // handle other errors
  return error instanceof Error ? error.message : 'An unknown error occurred';
}

// convert prisma object into regular js object
export function convertToPlainObject<T>(value: T): T {
  return JSON.parse(JSON.stringify(value));
}

//format number with decimal places

// export function formatNumberWithDecimal(num:number):string{
//  const [] = num.toString().split('.');
// return decimal? `${int}.${decimal.padEnd(2,'0')` : `${int}.00`
//  }



//round number to 2 decimal places
export function round2(value:number| string ) {
  if(typeof value === 'number'){
   return Math.round((value + Number.EPSILON) * 100 )/100;
  }else if(typeof value === 'string')
 {
  return Math.round((Number(value)+ Number.EPSILON) * 100 )/100;
  
}else{
 throw new Error('value is not a number pr strring')
}
}


const currencyFormatter = new Intl.NumberFormat('en-US', {
  style: 'currency',
  currency: 'USD',
  minimumFractionDigits: 2,
  maximumFractionDigits: 2,
})

//format currency using formater above
// export function formatCurrency(value: number) {
//   return currencyFormatter.format(value)
// }


export function formatCurrency(amount:number | string | null){
  if(typeof amount === 'number'){
    return currencyFormatter.format(amount)
  }else if(typeof amount === 'string'){
    return currencyFormatter.format(Number(amount))
  }else{
    return '0.00'
  }
}