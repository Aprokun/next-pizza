'use client';

import { FC } from 'react';
import { Dialog, DialogContent } from '@/components/ui/dialog';
import { useRouter } from 'next/navigation';
import { ChooseProductForm } from '@/components/shared/modals/choose-product-form';
import { ProductWithRelations } from '@/@types/prisma';
import { ChoosePizzaForm } from '@/components/shared/modals/choose-pizza-form';
import { cn } from '@/shared/lib/utils';
import { useCartStore } from '@/shared/store/cart';

type Props = {
	product: ProductWithRelations;
	className?: string;
};

export const ChooseProductModal: FC<Props> = ({ product, className }) => {
	const router = useRouter();
	const firstItem = product.items[0];
	const isPizzaForm = Boolean(product.items[0].pizzaType);
	const addCartItem = useCartStore((state) => state.addCartItem);
	const { imageUrl, name } = product;

	const onAddProduct = () => {
		addCartItem({
			productItemId: firstItem.id,
		});
	};

	const onAddPizza = (productItemId: number, ingredients: number[]) => {
		addCartItem({
			productItemId,
			ingredients,
		});
	};

	return (
		<Dialog open={Boolean(product)} onOpenChange={() => router.back()}>
			<DialogContent
				className={cn(
					'p-0 w-[1060px] max-w-[1060px] min-h-[500px] bg-white overflow-hidden',
					className,
				)}
			>
				{isPizzaForm ? (
					<ChoosePizzaForm
						name={name}
						imageUrl={imageUrl}
						ingredients={product.ingredients}
						items={product.items}
						onSubmit={onAddPizza}
					/>
				) : (
					<ChooseProductForm
						imageUrl={imageUrl}
						name={name}
						onSubmit={onAddProduct}
						price={firstItem.price}
					/>
				)}
			</DialogContent>
		</Dialog>
	);
};
