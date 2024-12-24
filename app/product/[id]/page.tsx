'use client';

import { FC } from 'react';

type Props = {
	params: {
		id: string;
	};
};

const ProductPage: FC<Props> = ({ params: { id } }) => {
	return <p>Product {id}</p>;
};

export default ProductPage;
