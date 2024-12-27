import { FC, useEffect, useState } from 'react';
import { cn } from '@/shared/lib/utils';
import Title from '@/components/shared/title';
import { Button } from '@/components/ui/button';
import { ProductImage } from '@/components/shared/product-image';
import { GroupVariants } from '@/components/shared/group-variants';
import {
	mapPizzaType,
	PizzaSize,
	pizzaSizes,
	PizzaType,
	pizzaTypes,
} from '@/shared/constants/pizza';
import { Ingredient, ProductItem } from '@prisma/client';
import { IngredientCard } from '@/components/shared/ingredient-card';
import { useSet } from 'react-use';

type Props = {
	imageUrl: string;
	name: string;
	className?: string;
	ingredients: Ingredient[];
	items: ProductItem[];
	onClickAddCart?: VoidFunction;
};

export const ChoosePizzaForm: FC<Props> = ({
	imageUrl,
	name,
	ingredients,
	onClickAddCart,
	items,
	className,
}) => {
	const [size, setSize] = useState<PizzaSize>(20);
	const [type, setType] = useState<PizzaType>(1);

	const [selectedIngredients, { toggle: addIngredient }] = useSet(new Set<number>([]));

	const textDetails = `${size} см, ${mapPizzaType[type]} тесто`;

	const pizzaPrice =
		items.find((item) => item.pizzaType === type && item.size === size)?.price || 0;
	const ingredientsPrice = ingredients
		.filter((ingredient) => selectedIngredients.has(ingredient.id))
		.reduce((acc, ingredient) => acc + ingredient.price, 0);

	const totalPrice = pizzaPrice + ingredientsPrice;

	const handleClickAdd = () => {
		onClickAddCart?.();
	};

	const availablePizzas = items.filter((item) => item.pizzaType === type);
	const availablePizzaSizes = pizzaSizes.map((item) => ({
		name: item.name,
		value: item.value,
		disabled: !availablePizzas.some((pizza) => Number(pizza.size) === Number(item.value)),
	}));

	useEffect(() => {
		const availableSize = availablePizzaSizes.find((item) => !item.disabled);

		if (availableSize) {
			setSize(Number(availableSize.value) as PizzaSize);
		}
	}, [type]);

	return (
		<div className={cn('flex flex-1', className)}>
			<ProductImage imageUrl={imageUrl} size={size} />

			<div className='w-[490px] bg-[#F7F7F7] p-7'>
				<Title text={name} size='md' className='font-extrabold mb-1' />

				<p className='text-gray-400'>{textDetails}</p>

				<div className='flex flex-col gap-4 mt-5'>
					<GroupVariants
						items={availablePizzaSizes}
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
					onClick={handleClickAdd}
					className='h-[55px] px-10 text-base rounded-[18px] w-full mt-10'
				>
					+ Добавить в корзину за {totalPrice} Р
				</Button>
			</div>
		</div>
	);
};
