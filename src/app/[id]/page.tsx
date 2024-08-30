import React from 'react';
import { notFound } from 'next/navigation';
import Image from 'next/image';
import { Car } from '../../types/Car';

interface CarPageProps {
    params: { id: string };
}

const CarPage = async ({ params }: CarPageProps) => {
    const res = await fetch(`http://localhost:3000/api/cars/${params.id}`);

    if (!res.ok) {
        return notFound();
    }

    const car: Car = await res.json();

    return (
        <div className="container mx-auto p-8">
            <div className="bg-white shadow-md rounded-lg overflow-hidden max-w-lg mx-auto">
                <Image
                    src={car.image}
                    alt={`${car.brand} ${car.model}`}
                    width={800}
                    height={600}
                    className="w-full h-64 object-cover"
                    layout="responsive"
                />
                <div className="p-4">
                    <h2 className="text-2xl font-bold mb-2 text-gray-900">
                        {car.brand} {car.model}
                    </h2>
                    <p className="text-gray-700 mb-2">
                        <strong>Color:</strong> {car.color}
                    </p>
                    <p className="text-gray-700 mb-2">
                        <strong>Price:</strong> {car.price}
                    </p>
                    <p className="text-gray-700 mb-2">
                        <strong>Year:</strong> {car.year}
                    </p>
                    <p className="text-gray-700 mb-2">
                        <strong>Engine Type:</strong> {car.engineType}
                    </p>
                    {car.transmission && (
                        <p className="text-gray-700 mb-2">
                            <strong>Transmission:</strong> {car.transmission}
                        </p>
                    )}
                    {car.range && (
                        <p className="text-gray-700 mb-2">
                            <strong>Range:</strong> {car.range} km
                        </p>
                    )}
                </div>
            </div>
        </div>
    );
};

export default CarPage;
