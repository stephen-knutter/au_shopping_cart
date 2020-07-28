export interface Product {
  _id: string;
  title: string;
  description: string;
  image: string;
  price: number;
  count?: number;
};

export interface ProductState {
  loading: boolean;
  products: Product[];
}