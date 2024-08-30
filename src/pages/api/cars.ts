import { NextApiRequest, NextApiResponse } from 'next';
import { Car } from '../../types/Car';
import path from 'path';
import fs from 'fs';
import { v4 as uuidv4 } from 'uuid'; // Импортируем uuid для генерации уникальных id

export default function handler(req: NextApiRequest, res: NextApiResponse) {
    const filePath = path.resolve('data/cars.json');

    const jsonData = fs.readFileSync(filePath, 'utf-8');
    const cars: Car[] = JSON.parse(jsonData);

    if (req.method === 'POST') {
        try {
            const newCar: Car = req.body;

            newCar.id = uuidv4();

            cars.push(newCar);
            fs.writeFileSync(filePath, JSON.stringify(cars, null, 2), 'utf-8');
            res.status(201).json(newCar);
        } catch (error) {
            console.error('Failed to add car:', error);
            res.status(500).json({ error: 'Failed to add car' });
        }
    } else {
        const { sortKey, sortOrder, brand, color, page = '1', limit = '10' } = req.query;

        let filteredCars = cars;

        if (typeof brand === 'string' && brand.trim() !== '') {
            filteredCars = filteredCars.filter(car => car.brand.toLowerCase() === brand.toLowerCase());
        }

        if (typeof color === 'string' && color.trim() !== '') {
            filteredCars = filteredCars.filter(car => car.color.toLowerCase() === color.toLowerCase());
        }

        if (sortKey && (sortKey === 'year' || sortKey === 'price')) {
            filteredCars.sort((a, b) => {
                let aValue: number, bValue: number;

                if (sortKey === 'price') {
                    aValue = parseFloat(a[sortKey] as unknown as string);
                    bValue = parseFloat(b[sortKey] as unknown as string);
                } else {
                    aValue = a[sortKey];
                    bValue = b[sortKey];
                }

                return sortOrder === 'asc' ? aValue - bValue : bValue - aValue;
            });
        }

        // Пагинация
        const pageNumber = parseInt(page as string, 10);
        const pageSize = parseInt(limit as string, 10);
        const startIndex = (pageNumber - 1) * pageSize;
        const paginatedCars = filteredCars.slice(startIndex, startIndex + pageSize);

        res.setHeader('Cache-Control', 'no-store');
        res.status(200).json({
            cars: paginatedCars,
            total: filteredCars.length,
            page: pageNumber,
            totalPages: Math.ceil(filteredCars.length / pageSize),
        });
    }
}
