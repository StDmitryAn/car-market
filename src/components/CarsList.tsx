import React from 'react';
import CarCard from './CarCard';
import { Car } from '../types/Car';

interface CarsListProps {
    cars: Car[];
}

const CarsList = ({ cars }: { cars: Car[] }) => {
    if (!Array.isArray(cars)) {
        return <div>Error: Cars data is not in the expected format.</div>;
    }

    return (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 p-4">
            {cars.map((car) => (
                <CarCard key={car.id} car={car} />
            ))}
        </div>
    );
};



export default CarsList;
