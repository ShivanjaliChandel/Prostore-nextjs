import { getProductBySlug } from "@/lib/actions/product.actions";
import { notFound } from "next/navigation";
import { Card, CardContent} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import ProductImages from "@/app/products/product-images";
import ProductPrice from "@/app/products/product-price";
// import { Plus } from "lucide-react";
import AddToCart from "@/app/products/add-to-cart";
import { CartItem } from "@/types";

import { getMycart } from "@/lib/actions/cart.actions";
    
const ProductDetailPage = async (props:{
    
    params:Promise<{slug:string}>
})=>{
 const {slug} = await props.params;
 const product = await getProductBySlug(slug);
 if(!product) notFound();
  const cart = await getMycart();

  // Check if item is in cart
  const isInCart = cart?.Items?.some((item: CartItem) => item.productId === product.id) || false;

return <> 
<section>
    <div className="grid grid-cols-1 md:grid-cols-5">
        {/* images column */}
         <div className="col-span-2">
           <ProductImages images={product.images}></ProductImages>
        </div>
             
        <div className="col-span-2 p-5">
            <div className="flex flex-col gap-6">
            <p>Product Brand:- {product.brand}</p>
            <p> Product Category:-{product.category}</p>
              <h1 className="h3-bold">{product.name}</h1>
           <div className="flex flex-col sm:flex-row sm:items-center gap-3">
                       <ProductPrice value={Number(product.price)} className="text-red-500"></ProductPrice>
                  </div>
            </div>
             <div className="mt-10">
        <p className="font-semibold">Description</p>
        {product.description}
            
    </div>
        </div>
    {/* //action column */}
   <div>
    <Card>
     <CardContent className='p-4'>
        <div className="mb-2 flex justify-between">
           
              <div>
               price
              </div>
              <div>
                <ProductPrice value ={Number(product.price)}/>
              </div>
        </div>
        <div className="mb-2 flex justify-between">
         <div>status</div>
         {product.stock > 0 ? (
           <Badge variant="outline">in stock </Badge>
         ):(
            <Badge variant="destructive">Out of Stock</Badge>
         )

         }
        </div>
        {product.stock>0 && (
            <div className="flex-center">
                <AddToCart 
                    item={{
                        productId:product.id,
                        name:product.name,
                        slug:product.slug,
                        price:product.price.toString(),
                        qty:1,
                        image:product.images![0]
                    }}
                    cart={cart}
                    isInCart={isInCart}
                />
            </div>
        )}
            
     </CardContent>
    </Card>
   </div>

    </div>
</section>
</>;
}
export default ProductDetailPage;