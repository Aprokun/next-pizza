import { axiosInstance } from '@/shared/services/instance';
import { CartDto } from '@/shared/services/dto/cart.dto';

export const fetchCart = async () => {
	const { data } = await axiosInstance.get<CartDto>('/cart');
	return data;
};

export const updateItemQuantity = async (id: number, quantity: number) => {
	const { data } = await axiosInstance.patch<CartDto>('/cart/' + id, { quantity });
	return data;
};

export const removeItemFromCart = async (id: number) => {
	const { data } = await axiosInstance.delete<CartDto>('/cart/' + id);
	return data;
};
