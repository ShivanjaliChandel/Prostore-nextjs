import { Card , CardHeader, CardContent, CardTitle, CardDescription } from "@/components/ui/card";
import Link from 'next/link';
import { Metadata } from "next";
import Image from 'next/image';
import { auth } from "@/app/(root)/auth";
import { redirect } from "next/navigation";
import SignUpForm from "./sign-up-form";

export const metadata:Metadata={
    title:'Sign up',
};

const SignUppage= async(props:{
    searchParams:Promise<{
        callbackUrl:string
    }>
})=>{
    
   const {callbackUrl} =await props.searchParams;

    const session = await auth();

    if(session){
        return redirect(callbackUrl || '/');
    }


return <div className="w-full max-w-md mx-auto">
  <Card>
       <CardHeader className="space-y-4">
            <Link href='/' className="flex-center">
           <Image
                       src="/logo.svg"        
                       alt="My Logo"
                       width={100}             
                       height={100}
                       priority ={true}               
                     />
            </Link>
           <CardTitle className="text-center">create account </CardTitle>
           <CardDescription className="text-center">Enter your information for signup form  </CardDescription>
      </CardHeader>
           <CardContent className="space-y-4">
         <SignUpForm></SignUpForm>
           </CardContent>
    </Card> 

</div>
}
export default SignUppage;