import { axiosInstance } from '@/shared/services/instance';
import { Ingredient } from '@prisma/client';
import { ApiRoutes } from '@/shared/services/constants';

export const getAll = async () => {
	const { data } = await axiosInstance.get<Ingredient[]>(ApiRoutes.FETCH_INGREDIENTS_ROUTE);

	return data;
};
