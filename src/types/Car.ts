export type EngineType = 'Petrol' | 'Diesel' | 'Electric';
export type TransmissionType = 'Automatic' | 'Manual' | 'Automated Manual';

export interface Car {
    id: string;
    image: string;
    brand: string;
    model: string;
    color: string;
    price: string;
    year: number;
    engineType: EngineType;
    transmission?: TransmissionType; // Only for Petrol or Diesel engines
    range?: number; // Only for Electric engines
}
