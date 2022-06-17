import * as Yup from 'yup'

export function initialValues() {
    return {
        title: '',
        typePost: '',
        typePet: '',
        gender: '',
        race: '',
        size: '',
        care1: false,
        care2: false,
        care3: false,
        description: '',
        location: null,
        useCreate: '',
        images: []
    }
}

export function validationSchema() {
    return Yup.object({
        title: Yup.string().required('El titulo es obligatorio'),
        //typePost: Yup.string().required('El tipo es obligatorio'),
        typePet: Yup.string().required('El tipo es obligatorio'),
        gender: Yup.string().required('El genero es obligatorio'),
        race: Yup.string().required('La raza es obligatoria'),
        size: Yup.string().required('El tamaño es obligatorio'),
        description: Yup.string().required('El descripción es obligatorio'),
        images: Yup.array().min(1, 'Se requiere al menos 1 imagen').required('Al menos 1 imagen es obligatoria')
    });
}