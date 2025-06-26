
const ProductPrice = ({value}:{value:number; className?:string;})=>{
// ensure two decimal number
const stringValue = value.toFixed(2);
//get the int value 
 const [intValue] = stringValue.split('.'); 
 
return (
<p className = "price">
    <span className="text-xs align-super">$</span>
    {intValue}
    <span className="text-xs align-super">.float</span>
</p>
);
}
export default ProductPrice;