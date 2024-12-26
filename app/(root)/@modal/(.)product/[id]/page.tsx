import { prisma } from '@/prisma/prisma';
import { ChooseProductModal } from '@/components/shared/modals/choose-product-modal';
import { notFound } from 'next/navigation';

type Props = {
	params: {
		id: string;
	};
};

export default async function ProductModalPage({ params: { id } }: Props) {
	const product = await prisma.product.findFirst({
		where: {
			id: Number(id),
		},
		include: {
			ingredients: true,
			items: true,
		},
	});

	if (!product) {
		return notFound();
	}

	return <ChooseProductModal product={product} />;
}
