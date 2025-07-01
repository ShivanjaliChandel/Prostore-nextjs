'use server';
// import { Prisma } from "@prisma/client";
import { prisma } from "@/db/prisma";
// import { convertToPlainObject } from "../utils";
import { LATEST_PRODUCT_LIMIT } from "../constants";
 //Get latest products

 export async function getLatestProducts() 
 {
 const data  = await prisma.product.findMany({
 take: LATEST_PRODUCT_LIMIT,
 orderBy: {createdAt:'desc'}

 });
 return data;
 }

 //get single proudtc 

// Get single product by slug
export async function getProductBySlug(slug: string) {
  return await prisma.product.findFirst({
    where: { slug:slug },
  });
}