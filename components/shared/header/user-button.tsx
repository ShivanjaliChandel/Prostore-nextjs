import Link from "next/link";
import { auth } from "@/app/(root)/auth";
import { signOutUser } from "@/lib/actions/user.actions";
import { Button } from "@/components/button";
import { UserIcon } from "lucide-react";
import { DropdownMenu, DropdownMenuTrigger , DropdownMenuItem, DropdownMenuContent, DropdownMenuLabel } from "@/components/ui/dropdown-menu";

const UserButton = async ()=>{
    const session = await auth();
    if(!session){
        return(

            <Button>
                <Link href='/sign-in'>
                <UserIcon>Sign in </UserIcon></Link>
            </Button>
        )
    }

    const firstInitial = session.user.name?.charAt(0).toUpperCase() ?? 'u'
    return(

   

      <div className="flex items-center gap-2">
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <Button>{firstInitial}</Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent>
                <DropdownMenuLabel>
                    <div className="text-sm font-medium leading-none">
                        {session.user.name}
                       
                    </div>
                    <div className="text-sm text-muted-foregroound leading-none">
                        {session.user.email}
                       
                    </div>
                </DropdownMenuLabel>
                <DropdownMenuItem className="p-0 mb-1">
                 <form action={signOutUser} className="w-full">
              <Button type="submit"  className="w-full justify-start"> signout</Button>
                 </form>
                </DropdownMenuItem>
            </DropdownMenuContent>
        </DropdownMenu>

       
      </div>
    );
}
export default UserButton;