import { NextApiRequest, NextApiResponse } from 'next';
import path from 'path';
import fs from 'fs';

export default function handler(req: NextApiRequest, res: NextApiResponse) {
    const { id } = req.query;
    const filePath = path.resolve('data/cars.json');
    const jsonData = fs.readFileSync(filePath, 'utf-8');
    const cars = JSON.parse(jsonData);

    const car = cars.find((car: any) => car.id === id);

    if (car) {
        res.status(200).json(car);
    } else {
        res.status(404).json({ message: 'Car not found' });
    }
}
