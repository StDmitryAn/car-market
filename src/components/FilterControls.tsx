import React from 'react';
import Link from 'next/link';

interface FilterControlsProps {
    brand: string;
    color: string;
    sortKey: string;
    sortOrder: string;
}

const FilterControls: React.FC<FilterControlsProps> = ({ brand, color, sortKey, sortOrder }) => {
    return (
        <div className="flex flex-col lg:flex-row lg:justify-end mb-4 p-4 bg-gray-100 rounded-md shadow-md">
            {/* Brand Filter */}
            <div className="flex flex-wrap mb-2 lg:mb-0 lg:mr-4">
                <span className="font-semibold text-gray-700 mr-2">Brand:</span>
                <Link
                    href={`/?brand=&color=${color}&sortKey=${sortKey}&sortOrder=${sortOrder}`}
                    className="text-blue-500 hover:text-blue-700 mr-2"
                >
                    All
                </Link>
                <Link
                    href={`/?brand=Toyota&color=${color}&sortKey=${sortKey}&sortOrder=${sortOrder}`}
                    className={`text-blue-500 hover:text-blue-700 mr-2 ${brand === 'Toyota' ? 'font-bold' : ''}`}
                >
                    Toyota
                </Link>
                <Link
                    href={`/?brand=Tesla&color=${color}&sortKey=${sortKey}&sortOrder=${sortOrder}`}
                    className={`text-blue-500 hover:text-blue-700 mr-2 ${brand === 'Tesla' ? 'font-bold' : ''}`}
                >
                    Tesla
                </Link>
                <Link
                    href={`/?brand=Lada&color=${color}&sortKey=${sortKey}&sortOrder=${sortOrder}`}
                    className={`text-blue-500 hover:text-blue-700 mr-2 ${brand === 'Lada' ? 'font-bold' : ''}`}
                >
                    Lada
                </Link>
            </div>

            {/* Color Filter */}
            <div className="flex flex-wrap">
                <span className="font-semibold text-gray-700 mr-2">Color:</span>
                <Link
                    href={`/?brand=${brand}&color=&sortKey=${sortKey}&sortOrder=${sortOrder}`}
                    className="text-blue-500 hover:text-blue-700 mr-2"
                >
                    All
                </Link>
                <Link
                    href={`/?brand=${brand}&color=White&sortKey=${sortKey}&sortOrder=${sortOrder}`}
                    className={`text-blue-500 hover:text-blue-700 mr-2 ${color === 'White' ? 'font-bold' : ''}`}
                >
                    White
                </Link>
                <Link
                    href={`/?brand=${brand}&color=Black&sortKey=${sortKey}&sortOrder=${sortOrder}`}
                    className={`text-blue-500 hover:text-blue-700 mr-2 ${color === 'Black' ? 'font-bold' : ''}`}
                >
                    Black
                </Link>
                <Link
                    href={`/?brand=${brand}&color=Red&sortKey=${sortKey}&sortOrder=${sortOrder}`}
                    className={`text-blue-500 hover:text-blue-700 mr-2 ${color === 'Red' ? 'font-bold' : ''}`}
                >
                    Red
                </Link>
            </div>
        </div>
    );
};

export default FilterControls;
