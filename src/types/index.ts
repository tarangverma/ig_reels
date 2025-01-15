export interface Product {
  id: string;
  name: string;
  price: number;
  url: string;
  image: string;
}

export interface VideoReel {
  id: string;
  videoUrl: string;
  products: {
    product: Product;
    position: { x: number; y: number };
  }[];
  likes: number;
} 