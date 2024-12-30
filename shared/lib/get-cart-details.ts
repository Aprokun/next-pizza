import { calcCartItemTotalPrice } from '@/shared/lib/calc-cart-item-total-price';
import { CartDto, CartItemDto } from '@/shared/services/dto/cart.dto';

export type CartStateItem = {
	id: number;
	quantity: number;
	name: string;
	imageUrl: string;
	price: number;
	disabled?: boolean;
	pizzaSize?: number | null;
	pizzaType?: number | null;
	ingredients: Array<{ name: string; price: number }>;
};

type ReturnProps = {
	items: CartStateItem[];
	totalAmount: number;
};

export const getCartDetails = (data: CartDto): ReturnProps => {
	const items = data.items.map((item) => ({
		id: item.id,
		name: item.productItem.product.name,
		quantity: item.quantity,
		imageUrl: item.productItem.product.imageUrl,
		price: calcCartItemTotalPrice(item),
		pizzaSize: item.productItem.size,
		pizzaType: item.productItem.pizzaType,
		ingredients: item.ingredients.map((ingredient) => ({
			name: ingredient.name,
			price: ingredient.price,
		})),
	}));

	return {
		items: items,
		totalAmount: data.totalAmount,
	};
};
