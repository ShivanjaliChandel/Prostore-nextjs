
import { getProductBySlug } from "@/lib/actions/product.actions";
import { notFound } from "next/navigation";
import { Card} from "@/components/ui/card";
import ProductImages from "@/app/products/product-images";
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