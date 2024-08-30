import type { NextApiRequest, NextApiResponse } from 'next';
import path from 'path';
import fs from 'fs';

export default function handler(req: NextApiRequest, res: NextApiResponse) {
    const filePath = path.resolve('data/carParams.json');
    const jsonData = fs.readFileSync(filePath, 'utf-8');
    const carParams = JSON.parse(jsonData);

    res.status(200).json(carParams);
}
