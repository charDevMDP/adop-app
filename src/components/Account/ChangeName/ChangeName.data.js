import * as Yup from 'yup'

export function initialValues() {
    return {
        userName: '',

    }
}

export function validationSchema() {
    return Yup.object({
        userName: Yup.string()
            .required('El usuario es obligatorio')
            .min(6, 'Debe tener al menos 6 caracteres')
            .trim(),
    });
}