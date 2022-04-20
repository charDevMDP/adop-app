import * as Yup from 'yup'

export function initialValues() {
    return {
        email: '',
        password: '',
    }
}

export function validationSchema() {
    return Yup.object({

        email: Yup.string()
            .email('El email no es correcto')
            .required('El email es obligatorio')
            .trim(),
        password: Yup.string()
            .required('La contraseña es obligatoria')
            .min(6, 'Debe tener al menos 6 caracteres')
            .trim(),
    });
}