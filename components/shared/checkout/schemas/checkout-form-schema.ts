import { z } from 'zod';

export const checkoutFormsSchema = z.object({
	firstName: z.string().min(2, { message: 'Имя должно содержать не менее 2 символов' }),
	lastName: z.string().min(2, { message: 'Фамилия должна содержать не менее 2 символов' }),
	email: z.string().email({ message: 'Введите корректную почту' }),
	phone: z.string().min(10, { message: 'Номер телефона должен содержать не менее 10 символов' }),
	address: z.string().min(5, { message: 'Введите корректный адрес' }),
	comment: z.string().optional(),
});

export type CheckoutFormValues = z.infer<typeof checkoutFormsSchema>;
