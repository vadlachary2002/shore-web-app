interface ProductData{
  productId: string,
  type:string,
  amount:number,
  hostingTime:number,
  offers:{field:string,value:boolean}[],
}
export default ProductData;
