import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Car } from '../types/Car';

interface CarCardProps {
    car: Car;
}

const CarCard: React.FC<CarCardProps> = ({ car }) => {
    return (
        <Link href={`/${car.id}`}>
            <div className="bg-white shadow-md rounded-lg overflow-hidden max-w-xs mx-auto cursor-pointer transition-transform transform hover:scale-105">
                <div className="relative w-full h-48">
                    <Image
                        src={car.image}
                        alt={`${car.brand} ${car.model}`}
                        fill
                        style={{ objectFit: 'cover' }}
                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                        className="w-full h-full object-cover"
                        priority
                    />
                </div>
                <div className="p-4">
                    <h2 className="text-xl font-bold mb-2 text-gray-900">
                        {car.brand} {car.model}
                    </h2>
                    <p className="text-gray-700 mb-2">
                        <strong>Year:</strong> {car.year}
                    </p>
                </div>
            </div>
        </Link>
    );
};

export default CarCard;
