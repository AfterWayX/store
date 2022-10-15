import Link from "next/link";
import { ProductsQuery } from "../../interfaces/Query.interface";
import Image from "next/future/image";
import { usePagination } from '../../hooks/usePagination';

interface PaginationI {
    count: number;
    query: ProductsQuery
}

export const Pagination = ({ count = 10, query }: PaginationI) => {
    const { limit = 10, skip = 0 } = query;
    const activePage = (skip / limit) + 1;

    const pages = usePagination({totalCount: count, pageSize: limit, siblingCount: 1, currentPage: activePage+1})
    return (
        <div className="my-5 mx-auto">
            <ul className="flex gap-3">
                <li  className={`my-auto mr-2 transition-all ${pages.length > 1 && activePage > 1 ? 'opacity-100 pointer-events-auto hover:opacity-70' : 'opacity-60 pointer-events-none'}`}>
                    <Link
                        href={{
                            pathname: '/products',
                            query: {
                                ...query,
                                skip: ((+activePage - 2) * limit),
                            },
                        }}
                    >
                        <a className={`my-auto`}>
                            <Image src='/arrow.png' alt="go back" width={20} height={20} />
                        </a>
                    </Link>
                </li>
                {
                    pages.map((page, index) => {
                        if (page === '...') {
                            return (
                              <li key={`${page}_${index}`} className="text-16-22 ">
                                &#8230;
                              </li>
                            );
                          }                  
                        return (
                            <li key={`${page}_${index}`} >
                                <Link
                                    href={{
                                        pathname: '/products',
                                        query: {
                                            ...query,
                                            skip: ((+page - 1) * limit),
                                        },
                                    }}
                                >
                                    <a className={`text-lg font-medium hover:opacity-70 transition-all ${activePage === (+page) ? 'text-blue-600 underline' : ''}`}>{page}</a>
                                </Link>
                            </li>
                        )
                    })
                }
                <li  className={`my-auto ml-2 rotate-180 transition-all ${pages.length > 1 && activePage < +pages[pages.length-1] ? 'opacity-100 pointer-events-auto hover:opacity-70' : 'opacity-60 pointer-events-none'}`}>
                    <Link
                        href={{
                            pathname: '/products',
                            query: {
                                ...query,
                                skip: ((+activePage + 1) * limit),
                            },
                        }}
                    >
                        <a className={`my-auto transform rotate-90`}>
                            <Image src='/arrow.png' alt="go back" width={20} height={20} />
                        </a>
                    </Link>
                </li>
            </ul>
        </div>
    )
}