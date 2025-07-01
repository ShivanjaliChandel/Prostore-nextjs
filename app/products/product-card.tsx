import { Card ,CardHeader} from "@/components/ui/card";
import { CardContent } from "@/components/ui/card";
import Link from "next/link";
import Image from "next/image";
import ProductPrice from "./product-price";
import { Product } from "@/types";

const ProductCard = ({product}:{product:Product;}) => {
  return (
    <Card className="w-full max-w-sm">
      <CardHeader className="p-0 items-center">
       <Link href={`/product/${product.slug}`}>
       <Image src={product.images[0]} alt={product.name} height={300} width={300}></Image>
       </Link>
   </CardHeader>
        <CardContent className="p-4 flex flex-col gap-2 text-center">
        <div className="text-xs">{product.brand}</div>
        <Link href={`/product/${product.slug}`}>
        <h2 className="text-sm font-medium">{product.name}</h2>
        </Link>
        <div className="flex-between gap-4">
             {/* <p>{product.rating}Stars</p>  */}
             {/* <p>{Number(product.rating).toFixed(1)} Stars</p> */}
            {product.stock>0 ? (
              <ProductPrice value={Number(product.price)} className="text-red-500"></ProductPrice>
            ):(
                <p className="text-destructive">out of stock</p>
            )}
        </div>
      </CardContent>
    </Card>
  );
};

export default ProductCard;
