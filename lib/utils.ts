import { Decimal } from "@prisma/client/runtime/library";
import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}


// convrt prisma object into regular js object
export function convertToPlainObject<T>(value: T):T{
return JSON.parse(JSON.stringify(value));
}

//format number with decimal places

export function formatNumberWithDecimal(num:number):string{
//  const [] = num.toString().split('.');
// return decimal? `${int}.${decimal.padEnd(2,'0')` : `${int}.00`
 }