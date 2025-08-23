import * as yup from 'yup';

export const loginSchema = yup.object({
    email: yup
        .string()
        .email('Введите корректный email')
        .required('Email обязателен'),
    password: yup
        .string()
        .min(6, 'Пароль должен содержать минимум 6 символов')
        .required('Пароль обязателен'),
});

export type LoginFormData = yup.InferType<typeof loginSchema>;