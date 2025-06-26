
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/button";
import { getProductBySlug } from "@/lib/actions/product.actions";
import { notFound } from "next/navigation";
import { Card ,CardHeader} from "@/components/ui/card";
import ProductImages from "@/app/products/product-images";
import ProductPage from "@/app/products/[id]/page";
import ProductPrice from "@/app/products/product-price";


const ProductDetailPage = async (props:{
    
    params:Promise<{slug:string}>
})=>{
 const {slug} = await props.params;
 const product = await getProductBySlug(slug);
 if(!product) notFound();
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
                  <p>{product.rating} of {product.numReviews}numReviews</p>
                  <div className="flex flex-col sm:flex-row sm:items-center gap-3">
                   <div className="w-24 rounded-full bg-green-100 text-green-700 px-5 py-2">${product.price}</div>
                  </div>
            </div>
             <div className="mt-10">
        <p className="font-semibold">Description</p>
        {product.description}
          
            {/* <button>Add to Cart</button> */}
         
            
    </div>
        </div>

        {/* //action column */}
   <div>
    <Card>
     <div className='p-4'>
        <div className="mb- flex justify-between">
           
              <div>
               
              </div>
        </div>

     </div>
    </Card>
   </div>

    </div>
</section>
</>;
}
export default ProductDetailPage;