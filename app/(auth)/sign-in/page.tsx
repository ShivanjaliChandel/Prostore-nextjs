import { Card , CardHeader, CardContent } from "@/components/ui/card";
import { APP_NAME } from "@/lib/constants";
import Link from 'next/link';
import { Metadata } from "next";
import Image from 'next/image';
import CredentialsSignInForm from "./credentials-signin-form";
import { auth } from "@/app/(root)/auth";
import { Redirect } from "next";
import { redirect } from "next/navigation";

export const metadata:Metadata={
    title:'Sign In',
};

const SignInpage= async(props:{
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
           <h3 className="text-center">sign in </h3>
           <div className="text-center">sign in to your account </div>
      </CardHeader>
           <CardContent className="space-y-4">
           <CredentialsSignInForm/>
           </CardContent>
    </Card> 

</div>
}
export default SignInpage;