import { FC } from 'react';
import { prisma } from '@/prisma/prisma';
import { notFound } from 'next/navigation';
import Container from '@/components/shared/container';
import { ProductInfo } from '@/components/shared/product-info';
import { ProductImage } from '@/components/shared/product-image';

type Props = {
	params: {
		id: string;
	};
};

const ProductPage: FC<Props> = async ({ params: { id } }) => {
	const product = await prisma.product.findFirst({ where: { id: Number(id) } });

	if (!product) {
		return notFound();
	}

	return (
		<Container className='flex flex-col my-10'>
			<div className='flex flex-1'>
				<ProductImage imageUrl={product.imageUrl} size={40} />
				<ProductInfo product={product} />
			</div>
		</Container>
	);
};

export default ProductPage;
