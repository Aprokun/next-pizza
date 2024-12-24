'use client';

import { Api } from '@/services/api-client';
import { Ingredient } from '@prisma/client';
import { useEffect, useState } from 'react';

interface ReturnProps {
	ingredients: Ingredient[];
}

export const useFilterIngredients = (): ReturnProps => {
	const [items, setItems] = useState<Ingredient[]>([]);

	useEffect(() => {
		Api.ingredients
			.getAll()
			.then((data) => setItems(data))
			.catch((error) => console.error(error));
	}, []);

	return { ingredients: items };
};
