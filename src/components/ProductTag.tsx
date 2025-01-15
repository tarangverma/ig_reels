import Image from 'next/image';
import { Product } from '../types';

interface Props {
  product: Product;
  position: { x: number; y: number };
}

const ProductTag = ({ product, position }: Props) => {
  return (
    <div
      className="absolute h-[200px] w-[200px] animate-fadeIn cursor-pointer"
      style={{
        left: `${position.x}%`,
        top: `${position.y}%`
      }}
    >
      <div className="bg-white rounded-lg shadow-lg p-2 text-center transform -translate-x-1/2 -translate-y-1/2">
        <Image src={product.image} alt={product.name} width={200} height={100} className="rounded-full" />
        <p className="font-medium text-[#000] text-sm">{product.name}</p>
        <p className="text-sm text-[#000]">${product.price}</p>
      </div>
    </div>
  );
};

export default ProductTag;
