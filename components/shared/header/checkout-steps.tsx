import React from "react";
import { cn } from "@/lib/utils";
const CheckoutSteps = ({current=0}) => {
    return (
        <div className="flex-between flex-col md:flex-row space-x-2 space-y-2 mb-10">
          {['User Login','shipping address','payment method','place order '].map((step,index)=>
               <React.Fragment key={step}>
                <div className={cn('p-2 w-56 rounde-full text-center text-sm',)}>
                    {step}
                </div>
               </React.Fragment>
             )}
        </div>
    )
}
export default CheckoutSteps;
