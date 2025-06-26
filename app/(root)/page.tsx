import sampleData from "@/db/sample-data";
import ProductList from "../products/[id]/product-list";
import { getLatestProducts } from "@/lib/actions/product.actions";

const Homepage = async ()=>{
    const latestproducts = await getLatestProducts();
    return(
        <>
        <ProductList data={latestproducts} title = 'newest products' ></ProductList>
        </>
    )
}
export default Homepage;

