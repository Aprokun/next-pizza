import { mapPizzaType, PizzaSize, PizzaType } from '@/shared/constants/pizza';
import { CartStateItem } from '@/shared/lib/get-cart-details';

export const getCartItemDetails = (
	ingredients: CartStateItem['ingredients'],
	pizzaType?: PizzaType,
	pizzaSize?: PizzaSize,
) => {
	const details = [];

	if (pizzaSize && pizzaType) {
		const typeName = mapPizzaType[pizzaType];
		details.push(`${typeName} ${pizzaSize} см`);
	}

	if (ingredients) {
		details.push(...ingredients);
	}

	return details.join(', ');
};
