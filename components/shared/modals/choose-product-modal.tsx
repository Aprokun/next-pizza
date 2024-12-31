'use client';

import { FC, useState } from 'react';
import { Dialog, DialogContent } from '@/components/ui/dialog';
import { useRouter } from 'next/navigation';
import { ChooseProductForm } from '@/components/shared/modals/choose-product-form';
import { ProductWithRelations } from '@/@types/prisma';
import { ChoosePizzaForm } from '@/components/shared/modals/choose-pizza-form';
import { cn } from '@/shared/lib/utils';
import { useCartStore } from '@/shared/store/cart';
import toast from 'react-hot-toast';

type Props = {
	product: ProductWithRelations;
	className?: string;
};

export const ChooseProductModal: FC<Props> = ({ product, className }) => {
	const router = useRouter();
	const firstItem = product.items[0];
	const isPizzaForm = Boolean(product.items[0].pizzaType);
	const [addCartItem, loading] = useCartStore((state) => [state.addCartItem, state.loading]);
	const { imageUrl, name } = product;

	const onAddProduct = async () => {
		try {
			await addCartItem({
				productItemId: firstItem.id,
			});
			toast.success('Продукт добавлен в корзину');
			router.back();
		} catch (error) {
			console.error(error);
			toast.error('Не удалось добавить продукт в корзину');
		}
	};

	const onAddPizza = async (productItemId: number, ingredients: number[]) => {
		try {
			await addCartItem({
				productItemId,
				ingredients,
			});
			toast.success('Пицца добавлена в корзину');
			router.back();
		} catch (error) {
			console.error(error);
			toast.error('Не удалось добавить пиццу в корзину');
		}
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
						loading={loading}
						ingredients={product.ingredients}
						items={product.items}
						onSubmit={onAddPizza}
					/>
				) : (
					<ChooseProductForm
						imageUrl={imageUrl}
						name={name}
						loading={loading}
						onSubmit={onAddProduct}
						price={firstItem.price}
					/>
				)}
			</DialogContent>
		</Dialog>
	);
};
