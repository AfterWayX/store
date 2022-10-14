
import { Product } from '../../interfaces/Product.interface';
import Link from 'next/dist/client/link';

interface ProductCardI {
    product: Product;
}

export const ProductCard = ({ product }: ProductCardI ) => {
    return (
        <div className='p-3 w-1/4'>
            <div className="w-full h-full shadow-lg flex flex-col p-5 border border-gray-100 rounded-lg bg-black bg-opacity-[0.01] gap-2">
                <div className="flex mx-auto">
                    <img className='w-full' src={'/no_image.jpg'} alt="no image found"  loading="lazy" />
                </div>
                <h2 className='text-xl font-bold mx-auto'>{product.name}</h2>
                <p className='font-medium'>Category: {product.category}</p>
                <p className='font-medium'>Color: {product.color}</p>
                <p className='font-medium'>Price: {product.price}</p>
                <Link href={''} >
                    <a className='flex w-full items-end'>
                        <p className='ml-auto font-medium underline text-blue-800 hover:text-blue-600 transition-all'>View Product</p>
                    </a>
                </Link>
            </div>
        </div>
    )
}