'use client';

import { Button } from "@/components/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { signUpDefaultValues } from "@/lib/constants";
import Link from "next/link";
import { useActionState } from "react";
import { useFormStatus } from "react-dom";
import { signUpUser } from "@/lib/actions/user.actions";
import { useSearchParams } from "next/navigation";


const SignUpForm = ()=>{
  const [data,action] = useActionState(signUpUser,{
    success:false,
    message:''
  });

  const searchParams = useSearchParams();
  const callbackUrl = searchParams.get('callbackUrl') || '/';
  const SignUpButton=()=>{
    const {pending} = useFormStatus();
    return(
        <Button disabled={pending} className="w-full" variant='default'>
            {pending?'Submitting...':'Sign Up '}
        </Button>
    )
  }

    return (
    <form action={action}>
        <input type="hidden" name="callbackurl" value={callbackUrl}></input>
        <div className="space-y-6">
             <div>
                <Label htmlFor="name">
                    Name
                </Label>
                <Input id='name' name="name" type="text" autoComplete="name" defaultValue={signUpDefaultValues.name}>
                </Input>
            </div>
            <div>
                <Label htmlFor="email">
                    Email
                </Label>
                <Input id='email' name="email" type="email" autoComplete="email" defaultValue={signUpDefaultValues.email}>
                </Input>
            </div>
             <div>
                <Label htmlFor="password">
                    password
                </Label>
                <Input id='password' name="password" type="password" required autoComplete="password" defaultValue={signUpDefaultValues.password}>
                </Input>
            </div>
             <div>
                <Label htmlFor="confirmPassword">
                    confirm password
                </Label>
                <Input id='confirmPassword' name="confirmPassword" type="password" required autoComplete="confirmPassword" defaultValue={signUpDefaultValues.confirmPassword}>
                </Input>
            </div>
            <div>
      <SignUpButton></SignUpButton>
        </div>
           
           {data && !data.success && (
            <div className="text-center text-destructive">
                {data.message}
            </div>
           )}

        <div className="text-sm text-center text-muted-foreground">
           Already have an account?{''}
            <Link href='/sign-in' target="_self" className="link">
            SignIn</Link>
        </div>
        </div>
    </form>
    )
}
export default SignUpForm;