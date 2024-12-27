import { PizzaSize, PizzaType } from '@/shared/constants/pizza';
import { Variant } from '@/components/shared/group-variants';
import { useEffect, useState } from 'react';
import { useSet } from 'react-use';
import { getAvailablePizzaSizes } from '@/shared/lib/get-available-pizza-sizes';
import { ProductItem } from '@prisma/client';

type ReturnProps = {
	size: PizzaSize;
	type: PizzaType;
	selectedIngredients: Set<number>;
	availableSizes: Variant[];
	setSize: (size: PizzaSize) => void;
	setType: (type: PizzaType) => void;
	addIngredient: (id: number) => void;
};

export const usePizzaOptions = (items: ProductItem[]): ReturnProps => {
	const [size, setSize] = useState<PizzaSize>(20);
	const [type, setType] = useState<PizzaType>(1);
	const [selectedIngredients, { toggle: addIngredient }] = useSet(new Set<number>([]));
	const availableSizes = getAvailablePizzaSizes(type, items);

	useEffect(() => {
		const availableSize = availableSizes.find((item) => !item.disabled);

		if (availableSize) {
			setSize(Number(availableSize.value) as PizzaSize);
		}
	}, [type]);

	return {
		size,
		type,
		selectedIngredients,
		availableSizes,
		setSize,
		setType,
		addIngredient,
	};
};
