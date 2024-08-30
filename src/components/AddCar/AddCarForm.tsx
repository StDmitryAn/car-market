"use client";

import React from 'react';
import { useRouter } from 'next/navigation';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import { validationSchema } from './validationSchema';
import { initialValues } from './initialValues';

const AddCarForm = ({ carParams }: { carParams: any }) => {
    const router = useRouter();

    const handleSubmit = (values: typeof initialValues, { setSubmitting, setFieldValue }: any) => {
        let imageName = '';

        const uploadImage = () => {
            if (typeof values.image === 'string') {
                imageName = values.image;
                return Promise.resolve();
            } else if (values.image) {
                const formData = new FormData();
                formData.append('file', values.image);

                return fetch('/api/upload', {
                    method: 'POST',
                    body: formData,
                })
                    .then(response => response.json())
                    .then(result => {
                        if (result.success) {
                            imageName = `/uploads/${result.name}`;
                            setFieldValue('image', imageName);
                        } else {
                            alert('Image upload failed');
                            throw new Error('Image upload failed');
                        }
                    })
                    .catch(error => {
                        console.error('Error uploading image:', error);
                        throw error;
                    });
            } else {
                return Promise.resolve();
            }
        };

        uploadImage()
            .then(() => {
                const carDetails = { ...values, image: imageName };
                return fetch('/api/cars', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(carDetails),
                });
            })
            .then(res => {
                if (res.ok) {
                    router.push('/');
                    router.refresh();
                } else {
                    console.error('Failed to add car');
                }
            })
            .catch(error => {
                console.error('An error occurred while adding the car', error);
            })
            .finally(() => {
                setSubmitting(false);
            });
    };

    return (
        <div className="container mx-auto p-8">
            <h1 className="text-3xl font-bold mb-6">Add New Car</h1>
            <Formik
                initialValues={initialValues}
                validationSchema={validationSchema}
                onSubmit={handleSubmit}
            >
                {({ values, setFieldValue, isSubmitting }) => (
                    <Form className="space-y-4">
                        <div>
                            <label className="block text-sm font-medium">Brand</label>
                            <Field
                                as="select"
                                name="brand"
                                className="mt-1 block w-full p-2 border border-gray-300 rounded bg-gray-100 text-black"
                            >
                                <option value="">Select Brand</option>
                                {carParams.brands.map((brand: string) => (
                                    <option key={brand} value={brand}>{brand}</option>
                                ))}
                            </Field>
                            <ErrorMessage name="brand" component="div" className="text-red-500 text-sm" />
                        </div>

                        <div>
                            <label className="block text-sm font-medium">Model</label>
                            <Field
                                as="select"
                                name="model"
                                className="mt-1 block w-full p-2 border border-gray-300 rounded bg-gray-100 text-black"
                            >
                                <option value="">Select Model</option>
                                {values.brand && carParams.models[values.brand]?.map((model: string) => (
                                    <option key={model} value={model}>{model}</option>
                                ))}
                            </Field>
                            <ErrorMessage name="model" component="div" className="text-red-500 text-sm"/>
                        </div>

                        <div>
                            <label className="block text-sm font-medium">Color</label>
                            <Field
                                as="select"
                                name="color"
                                className="mt-1 block w-full p-2 border border-gray-300 rounded bg-gray-100 text-black"
                            >
                                <option value="">Select Color</option>
                                {carParams.colors.map((color: string) => (
                                    <option key={color} value={color}>{color}</option>
                                ))}
                            </Field>
                            <ErrorMessage name="color" component="div" className="text-red-500 text-sm"/>
                        </div>

                        <div>
                            <label className="block text-sm font-medium">Price</label>
                            <Field
                                type="number"
                                name="price"
                                className="mt-1 block w-full p-2 border border-gray-300 rounded bg-gray-100 text-black"
                                min="0"
                                required
                            />
                            <ErrorMessage name="price" component="div" className="text-red-500 text-sm"/>
                        </div>

                        <div>
                            <label className="block text-sm font-medium">Year</label>
                            <Field
                                type="number"
                                name="year"
                                className="mt-1 block w-full p-2 border border-gray-300 rounded bg-gray-100 text-black"
                                min="1900"
                                max={new Date().getFullYear()}
                                required
                            />
                            <ErrorMessage name="year" component="div" className="text-red-500 text-sm"/>
                        </div>

                        <div>
                            <label className="block text-sm font-medium">Engine Type</label>
                            <Field
                                as="select"
                                name="engineType"
                                className="mt-1 block w-full p-2 border border-gray-300 rounded bg-gray-100 text-black"
                                required
                            >
                                <option value="">Select Engine Type</option>
                                {carParams.engineTypes.map((type: string) => (
                                    <option key={type} value={type}>{type}</option>
                                ))}
                            </Field>
                            <ErrorMessage name="engineType" component="div" className="text-red-500 text-sm"/>
                        </div>

                        {(values.engineType === 'Gasoline' || values.engineType === 'Diesel') && (
                            <div>
                                <label className="block text-sm font-medium">Transmission</label>
                                <Field
                                    as="select"
                                    name="transmission"
                                    className="mt-1 block w-full p-2 border border-gray-300 rounded bg-gray-100 text-black"
                                    required
                                >
                                    <option value="">Select Transmission</option>
                                    {carParams.transmissions.map((transmission: string) => (
                                        <option key={transmission} value={transmission}>{transmission}</option>
                                    ))}
                                </Field>
                                <ErrorMessage name="transmission" component="div" className="text-red-500 text-sm"/>
                            </div>
                        )}

                        {values.engineType === 'Electric' && (
                            <div>
                                <label className="block text-sm font-medium">Range (km)</label>
                                <Field
                                    type="number"
                                    name="range"
                                    className="mt-1 block w-full p-2 border border-gray-300 rounded bg-gray-100 text-black"
                                    min="0"
                                />
                                <ErrorMessage name="range" component="div" className="text-red-500 text-sm"/>
                            </div>
                        )}

                        <div>
                            <label className="block text-sm font-medium">Image</label>
                            <input
                                type="file"
                                name="image"
                                onChange={(event) => {
                                    if (event.currentTarget.files) {
                                        const file = event.currentTarget.files[0];

                                        const formData = new FormData();
                                        formData.append('file', file);

                                        fetch('/api/upload', {
                                            method: 'POST',
                                            body: formData,
                                        })
                                            .then(response => response.json())
                                            .then(result => {
                                                if (result.success) {
                                                    setFieldValue('image', `/uploads/${result.name}`);
                                                } else {
                                                    alert('Image upload failed');
                                                }
                                            })
                                            .catch(error => {
                                                console.error('Error uploading image:', error);
                                                alert('Image upload failed');
                                            });
                                    }
                                }}
                                className="mt-1 block w-full p-2 border border-gray-300 rounded bg-gray-100 text-black"
                            />
                            <ErrorMessage name="image" component="div" className="text-red-500 text-sm" />
                        </div>

                        <button
                            type="submit"
                            disabled={isSubmitting}
                            className="mt-4 px-4 py-2 bg-blue-500 text-white rounded"
                        >
                            Add Car
                        </button>
                    </Form>
                )}
            </Formik>
        </div>
    );
};

export default AddCarForm;
