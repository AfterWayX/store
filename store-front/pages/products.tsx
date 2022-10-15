import type { GetServerSideProps, GetServerSidePropsContext } from 'next'
import React from 'react';

import { SearchService } from '../services/SearchService.service';
import { Product } from '../interfaces/Product.interface';
import { ProductsQuery } from '../interfaces/Query.interface';
import { FilterFieldsI } from '../interfaces/FilterFields.interface';
import { Filter } from '../components/Filter/Filter';
import { ProductCard } from '../components/ProductCard/ProductCard';
import { Header } from '../components/Header/Header';
import { Pagination } from '../components/Pagination/Pagination';

interface ProductsProps {
  results: Product[];
  count: number;
  filterFields: FilterFieldsI;
  query: ProductsQuery;
}

const Products = ({ results, filterFields, count, query }: ProductsProps) => {
  return (
    <div className='min-h-screen min-w-screen bg-white text-black'>
      <Header />
      <div className='container flex flex-col'>
        <Filter fields={filterFields} />
        <div className='flex flex-wrap justify-center'>
          {
            results.map((product: Product) => (
              <ProductCard key={product.id} product={product} />
            ))
          }
        </div>
        <Pagination count={count} query={query} />
      </div>
    </div>
  )
}
export const getServerSideProps: GetServerSideProps = async (
  context: GetServerSidePropsContext,
) => {
  const { query } = context;

  const res = await SearchService.products(query);

  const fRes = await SearchService.fields();


  return {
    props: {
      query,
      filterFields: fRes.data,
      results: res.data.data,
      count: res.data.count,
    },
  };
};

export default Products
