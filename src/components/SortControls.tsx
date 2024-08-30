import React from 'react';
import Link from 'next/link';

interface SortControlsProps {
    sortKey: string;
    sortOrder: string;
    brand: string;
    color: string;
}

const SortControls: React.FC<SortControlsProps> = ({ sortKey, sortOrder, brand, color }) => {
    const getNewOrder = (currentOrder: string) => (currentOrder === 'asc' ? 'desc' : 'asc');

    return (
        <div className="flex justify-end mb-4">
            <Link
                href={`/?sortKey=year&sortOrder=${sortKey === 'year' ? getNewOrder(sortOrder) : 'asc'}&brand=${brand}&color=${color}`}
                className={`border border-gray-300 rounded p-2 mr-2 ${sortKey === 'year' ? 'bg-blue-200' : ''}`}
            >
                Sort by Year
            </Link>
            <Link
                href={`/?sortKey=price&sortOrder=${sortKey === 'price' ? getNewOrder(sortOrder) : 'asc'}&brand=${brand}&color=${color}`}
                className={`border border-gray-300 rounded p-2 ${sortKey === 'price' ? 'bg-blue-200' : ''}`}
            >
                Sort by Price
            </Link>
        </div>
    );
};

export default SortControls;
