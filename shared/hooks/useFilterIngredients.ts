'use client';

import { Ingredient } from '@prisma/client';
import { useSet } from 'react-use';

interface ReturnProps {
	onAddId: (id: string) => void;
	setSelectedIngredients: (ids: string[]) => void;
}

export const useFilterIngredients = (values: string[] = []): ReturnProps => {
	const [selectedIngredients, { toggle }] = useSet<string>(new Set(values));

	const setSelectedIngredients = (ids: string[]) => {
		ids.forEach(selectedIngredients.add);
	};

	return {
		onAddId: toggle,
		setSelectedIngredients,
	};
};
