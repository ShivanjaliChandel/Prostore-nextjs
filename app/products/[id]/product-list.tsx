import ProductCard from "../product-card";

interface Props {
  data: any[];
  title: string;
}

const ProductList = ({ data, title }: Props) => {
  if (!data || data.length === 0) {
    return <p>No products available.</p>;
  }

  return (
    <div>
      <h2 className="mx-auto text-xl font-bold mb-4 text-center">{title}</h2>
      <div className="mx-auto grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
        {data.map((product) => (
          <ProductCard key={product.slug} product={product} />
        ))}
      </div>
    </div>
  );
};

export default ProductList;
