'use server';
import { signInFormSchema, signUpFormSchema } from "../constants/validators";
import { signIn, signOut} from "@/app/(root)/auth";
import { isRedirectError } from "next/dist/client/components/redirect-error";
import { hashSync } from "bcrypt-ts-edge";
import { Prisma } from "@prisma/client";
import { prisma } from "@/db/prisma";
import { formatError } from "../utils";
// sign in the user with credentials 
export async function signInWithCredentials(prevState:unknown,formData:FormData){
 try{
    const user = signInFormSchema.parse({
        email:formData.get('email'),
        password:formData.get('password')
    });
    await signIn('credentials',user);
    return{success:true, message:'signed in successfully'}
 }
 catch(error){
  if(isRedirectError(error)){
    throw error;
  }
  return{success:false, message:'Invalid Email or password'};
 }
}

// sign user out 

export async function signOutUser(){
    await signOut();
}

//signup user 
export async function signUpUser(prevState:unknown,formData:FormData){
 try{
  const user = signUpFormSchema.parse({
    name:formData.get('name'),
    email:formData.get('email'),
     password:formData.get('password'),
     confirmPassword:formData.get('confirmPassword'),
    
  });

      const plainPassword = user.password;
  user.password = hashSync(user.password,10);
  await prisma.user.create({
    data:{
      name:user.name,
      email:user.email,
      password:user.password,
    },
  });
  await signIn('credentials',{
    email:user.email,
    password:plainPassword,

  });
  return{
    success:true, message:'user registered successfully'
  }
 } catch(error){
  console.log(error.name);
   console.log(error.code);
    console.log(error.errors);
     console.log(error.meta?.target);
if(isRedirectError(error)){
    throw error;
  }
  return{success:false, message:formatError(error)};
 }
}