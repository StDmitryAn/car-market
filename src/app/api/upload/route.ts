import { NextRequest, NextResponse } from "next/server";
import path from "path";
import fs from "fs";
import { v4 as uuidv4 } from 'uuid';

const UPLOAD_DIR = path.resolve(process.env.ROOT_PATH ?? "", "public/uploads");

export const POST = async (req: NextRequest) => {
    try {
        const formData = await req.formData();
        const file = formData.get("file") as File | null;

        if (!file) {
            console.error("No file found in formData");
            return NextResponse.json({
                success: false,
                message: "No file uploaded",
            });
        }

        if (!(file instanceof File)) {
            console.error("Uploaded data is not a valid File instance");
            return NextResponse.json({
                success: false,
                message: "Uploaded data is not a valid file",
            });
        }

        // Генерация уникального имени файла
        const uniqueSuffix = `${uuidv4()}-${Date.now()}`;
        const fileExtension = path.extname(file.name);
        const uniqueFileName = `${path.basename(file.name, fileExtension)}-${uniqueSuffix}${fileExtension}`;

        // Создаем буфер из файла
        const buffer = Buffer.from(await file.arrayBuffer());

        // Создаем директорию, если она не существует
        if (!fs.existsSync(UPLOAD_DIR)) {
            fs.mkdirSync(UPLOAD_DIR, { recursive: true });
        }

        // Записываем файл в директорию
        const filePath = path.resolve(UPLOAD_DIR, uniqueFileName);
        fs.writeFileSync(filePath, buffer);

        console.log(`File saved successfully: ${filePath}`);

        return NextResponse.json({
            success: true,
            name: uniqueFileName,
        });
    } catch (err) {
        const error = err as Error;
        console.error('Error uploading file:', error);
        return NextResponse.json({
            success: false,
            message: error.message,
        });
    }
};
