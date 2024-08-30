import React from 'react';
import Link from 'next/link';
import CarsList from '../components/CarsList';
import SortControls from '../components/SortControls';
import FilterControls from '../components/FilterControls';

interface PageProps {
    searchParams: { [key: string]: string | undefined };
}

const Page = async ({ searchParams }: PageProps) => {
    const sortKey = searchParams.sortKey || '';
    const sortOrder = searchParams.sortOrder || '';
    const brand = searchParams.brand || '';
    const color = searchParams.color || '';
    const page = parseInt(searchParams.page || '1', 10);
    const limit = parseInt(searchParams.limit || '8', 10);

    const res = await fetch(
        `http://localhost:3000/api/cars?sortKey=${sortKey}&sortOrder=${sortOrder}&brand=${brand}&color=${color}&page=${page}&limit=${limit}`,
        { cache: 'no-store' }
    );
    const { cars, total, totalPages } = await res.json();

    const previousPage = page > 1 ? page - 1 : null;
    const nextPage = page < totalPages ? page + 1 : null;

    return (
        <div className="container mx-auto p-8">
            <h1 className="text-3xl font-bold mb-6">Car market</h1>
            <div className="flex justify-between mb-4">
                <div>
                    <FilterControls brand={brand} color={color} sortKey={sortKey} sortOrder={sortOrder} />
                    <SortControls sortKey={sortKey} sortOrder={sortOrder} brand={brand} color={color} />
                </div>
                <Link href="/add">
                    <button className="bg-green-500 text-white px-4 py-2 rounded">Add New Car</button>
                </Link>
            </div>
            <CarsList cars={cars} />

            <div className="flex justify-between mt-4">
                <button
                    disabled={!previousPage}
                    className={`px-4 py-2 rounded ${!previousPage ? 'bg-gray-300 cursor-not-allowed' : 'bg-blue-500 text-white'}`}
                >
                    {previousPage ? (
                        <Link href={`/?sortKey=${sortKey}&sortOrder=${sortOrder}&brand=${brand}&color=${color}&page=${previousPage}&limit=${limit}`}>
                            Previous
                        </Link>
                    ) : (
                        <span>Previous</span>
                    )}
                </button>
                <span>
                    Page {page} of {totalPages}
                </span>
                <button
                    disabled={!nextPage}
                    className={`px-4 py-2 rounded ${!nextPage ? 'bg-gray-300 cursor-not-allowed' : 'bg-blue-500 text-white'}`}
                >
                    {nextPage ? (
                        <Link href={`/?sortKey=${sortKey}&sortOrder=${sortOrder}&brand=${brand}&color=${color}&page=${nextPage}&limit=${limit}`}>
                            Next
                        </Link>
                    ) : (
                        <span>Next</span>
                    )}
                </button>
            </div>
        </div>
    );
};

export default Page;
