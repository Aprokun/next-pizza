import { useRouter, useSearchParams } from 'next/navigation';
import { useSet } from 'react-use';
import { useMemo, useState } from 'react';

interface PriceRange {
	priceFrom?: number;
	priceTo?: number;
}

interface QueryFilters extends PriceRange {
	pizzaTypes: string[];
	sizes: string[];
	ingredients: string[];
}

export interface Filters {
	pizzaTypes: Set<string>;
	sizes: Set<string>;
	selectedIngredients: Set<string>;
	prices: PriceRange;
}

interface ReturnProps extends Filters {
	setPrices: (name: keyof PriceRange, value: number) => void;
	setPizzaTypes: (value: string) => void;
	setSizes: (value: string) => void;
	setSelectedIngredients: (value: string) => void;
	setIngredients: (value: string) => void;
}

export const useFilters = () => {
	const router = useRouter();
	const searchParams = useSearchParams() as unknown as Map<keyof QueryFilters, string>;

	const [selectedIngredients, { toggle: toggleIngredients }] = useSet(
		new Set<string>(searchParams.get('ingredients')?.split(',')),
	);

	const [sizes, { toggle: toggleSizes }] = useSet<string>(
		new Set<string>(searchParams.get('sizes') ? searchParams.get('sizes')?.split(',') : []),
	);

	const [pizzaTypes, { toggle: togglePizzaTypes }] = useSet<string>(
		new Set<string>(
			searchParams.get('pizzaTypes') ? searchParams.get('pizzaTypes')?.split(',') : [],
		),
	);

	const [prices, setPrices] = useState<PriceRange>({
		priceFrom: Number(searchParams.get('priceFrom')) || undefined,
		priceTo: Number(searchParams.get('priceTo')) || undefined,
	});

	const updatePrice = (name: keyof PriceRange, value: number) => {
		setPrices((prev) => ({ ...prev, [name]: value }));
	};

	return useMemo(
		() => ({
			sizes,
			pizzaTypes,
			selectedIngredients,
			prices,
			setPrices: updatePrice,
			setPizzaTypes: togglePizzaTypes,
			setSizes: toggleSizes,
			setSelectedIngredients: toggleIngredients,
		}),
		[sizes, pizzaTypes, selectedIngredients, prices],
	);
};
