import { getServerSession } from 'next-auth';
import { authOptions } from 'app/api/auth/[...nextauth]/route';
import { redirect } from 'next/navigation';
import AddCarForm from '../../components/AddCar/AddCarForm';
import SignOutButton from '../../components/SignOutButton';
import path from 'path';
import fs from 'fs/promises';

export default async function Page() {
    const session = await getServerSession(authOptions);

    if (!session) {
        redirect('/api/auth/signin?csrf=true');
        return null;
    }

    const carParamsPath = path.join(process.cwd(), 'data', 'carParams.json');
    const carParamsData = await fs.readFile(carParamsPath, 'utf-8');
    const carParams = JSON.parse(carParamsData);

    return (
        <div>
            <AddCarForm carParams={carParams} />
            <div className="flex justify-center">
                <SignOutButton />
            </div>
        </div>
    );
}
