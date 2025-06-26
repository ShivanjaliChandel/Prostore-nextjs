'use server';
// import { Prisma } from "@prisma/client";
import { PrismaClient } from "@prisma/client";
// import { convertToPlainObject } from "../utils";
import { LATEST_PRODUCT_LIMIT } from "../constants";
 //Get latest products

 export async function getLatestProducts() 
 {
 const prisma = new PrismaClient();
 const data  = await prisma.product.findMany({
 take: LATEST_PRODUCT_LIMIT,
 orderBy: {createdAt:'desc'}

 });
 return data;
 }

 //get single proudtc 

const prisma = new PrismaClient();

// Get single product by slug
export async function getProductBySlug(slug: string) {
  return await prisma.product.findFirst({
    where: { slug:slug },
  });
}