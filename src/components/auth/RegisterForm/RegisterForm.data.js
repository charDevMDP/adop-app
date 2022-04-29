import * as Yup from 'yup'

export function initialValues() {
    return {
        userName: '',
        email: '',
        password: '',
        repeatPass: '',
        acceptTerms: false
    }
}

export function validationSchema() {
    return Yup.object({
        userName: Yup.string()
            .required('El usuario es obligatorio')
            .min(6, 'Debe tener al menos 6 caracteres')
            .trim(),
        email: Yup.string()
            .email('El email no es correcto')
            .required('El email es obligatorio')
            .trim(),
        password: Yup.string()
            .required('La contraseña es obligatoria')
            .min(6, 'Debe tener al menos 6 caracteres')
            .trim(),
        repeatPass: Yup.string()
            .required('La contraseña es obligatoria')
            .min(6, 'Debe tener al menos 6 caracteres')
            .trim()
            .oneOf([Yup.ref('password')], 'Las contraseñas tienen que ser iguales'),
        acceptTerms: Yup.boolean()
            .required('Debes aceptar los terminos y condiciones')
            .oneOf([true], 'Debes aceptar los terminos y condiciones')
    });
}