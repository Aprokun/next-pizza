import { FC } from 'react';
import { cn } from '@/shared/lib/utils';
import Title from '@/components/shared/title';
import { Button } from '@/components/ui/button';
import { ProductImage } from '@/components/shared/product-image';
import { GroupVariants } from '@/components/shared/group-variants';
import { PizzaSize, PizzaType, pizzaTypes } from '@/shared/constants/pizza';
import { Ingredient, ProductItem } from '@prisma/client';
import { IngredientCard } from '@/components/shared/ingredient-card';
import { usePizzaOptions } from '@/shared/hooks/usePizzaOptions';
import { getPizzaDetails } from '@/shared/lib/get-pizza-details';

type Props = {
	imageUrl: string;
	name: string;
	className?: string;
	loading: boolean;
	ingredients: Ingredient[];
	items: ProductItem[];
	onSubmit: (itemId: number, ingredients: number[]) => void;
};

export const ChoosePizzaForm: FC<Props> = ({
	imageUrl,
	name,
	ingredients,
	loading,
	onSubmit,
	items,
	className,
}) => {
	const {
		size,
		type,
		selectedIngredients,
		availableSizes,
		currentItemId,
		setSize,
		setType,
		addIngredient,
	} = usePizzaOptions(items);

	const { totalPrice, textDetails } = getPizzaDetails(
		type,
		size,
		items,
		ingredients,
		selectedIngredients,
	);

	const handleClickAdd = () => {
		if (currentItemId) {
			onSubmit(currentItemId, Array.from(selectedIngredients));
		}
	};

	return (
		<div className={cn('flex flex-1', className)}>
			<ProductImage imageUrl={imageUrl} size={size} />

			<div className='w-[490px] bg-[#F7F7F7] p-7'>
				<Title text={name} size='md' className='font-extrabold mb-1' />

				<p className='text-gray-400'>{textDetails}</p>

				<div className='flex flex-col gap-4 mt-5'>
					<GroupVariants
						items={availableSizes}
						value={String(size)}
						onClick={(value) => setSize(Number(value) as PizzaSize)}
					/>

					<GroupVariants
						items={pizzaTypes}
						value={String(type)}
						onClick={(value) => setType(Number(value) as PizzaType)}
					/>
				</div>

				<div className='bg-gray-50 p-5 rounded-md h-[420px] overflow-auto scrollbar mt-5'>
					<div className='grid grid-cols-3 gap-3'>
						{ingredients.map((ingredient) => (
							<IngredientCard
								imageUrl={ingredient.imageUrl}
								name={ingredient.name}
								price={String(ingredient.price)}
								onClick={() => addIngredient(ingredient.id)}
								active={selectedIngredients.has(ingredient.id)}
							/>
						))}
					</div>
				</div>

				<Button
					loading={loading}
					onClick={handleClickAdd}
					className='h-[55px] px-10 text-base rounded-[18px] w-full mt-10'
				>
					+ Добавить в корзину за {totalPrice} Р
				</Button>
			</div>
		</div>
	);
};
