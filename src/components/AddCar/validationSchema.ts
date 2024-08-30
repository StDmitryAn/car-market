import * as Yup from 'yup';

export const validationSchema = Yup.object().shape({
    brand: Yup.string().required('Required'),
    model: Yup.string().required('Required'),
    color: Yup.string().required('Required'),
    price: Yup.number().required('Required').typeError('Must be a number'),
    year: Yup.number().required('Required').typeError('Must be a number'),
    engineType: Yup.string().required('Required'),
    transmission: Yup.string().when('engineType', {
        is: (val: string) => val === 'Gasoline' || val === 'Diesel',
        then: schema => schema.required('Required'),
        otherwise: schema => schema.notRequired(),
    }),
    range: Yup.number().when('engineType', {
        is: 'Electric',
        then: schema => schema.required('Required').typeError('Must be a number'),
        otherwise: schema => schema.notRequired(),
    }),
    image: Yup.mixed().required('Image is required'),
});
