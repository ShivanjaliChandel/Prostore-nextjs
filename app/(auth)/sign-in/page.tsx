import { Card , CardHeader, CardContent, CardTitle,CardDescription } from "@/components/ui/card";
import Link from 'next/link';
import { Metadata } from "next";
import Image from 'next/image';
import CredentialsSignInForm from "./credentials-signin-form";
import { auth } from "@/app/(root)/auth";
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
           <CardTitle className="text-center">sign in </CardTitle>
           <CardDescription className="text-center">sign in to your account </CardDescription>
      </CardHeader>
           <CardContent className="space-y-4">
           <CredentialsSignInForm/>
           </CardContent>
    </Card> 

</div>
}
export default SignInpage;