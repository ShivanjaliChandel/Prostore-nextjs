import Banner from '@/components/Banner'
import BannerSlider from '@/components/BannerSlider'
import Gridslider from '@/components/grid-slider'
import ProductList from './products/[id]/product-list';
import { getLatestProducts } from '@/lib/actions/product.actions';
     


export default async function Home() {
    const latestProducts = await getLatestProducts();
    console.log("Fetched Products:", latestProducts); 
  return (
    <div>
      <Banner />
      <BannerSlider />
      <Gridslider />
   <ProductList data={latestProducts} title="Newest Products" />
    
    </div>
  );
}



