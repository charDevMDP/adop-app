import * as Yup from 'yup'

export function initialValues() {
    return {
        passwordCurrent: '',
        passwordNew: '',
        repeatPass: '',
    }
}

export function validationSchema() {
    return Yup.object({
        passwordCurrent: Yup.string()
            .required('La contraseña es obligatoria')
            .min(6, 'Debe tener al menos 6 caracteres')
            .trim(),
        passwordNew: Yup.string()
            .required('La contraseña es obligatoria')
            .min(6, 'Debe tener al menos 6 caracteres')
            .trim(),
        repeatPass: Yup.string()
            .required('La contraseña es obligatoria')
            .min(6, 'Debe tener al menos 6 caracteres')
            .trim()
            .oneOf([Yup.ref('passwordNew')], 'Las contraseñas nuevas tienen que ser iguales'),
    });
}