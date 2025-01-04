import Container from '@/components/shared/container';
import Header from '@/components/shared/header';
import { Metadata } from 'next';
import { ReactNode } from 'react';

export const metadata: Metadata = {
	title: 'Next Pizza | Корзина',
	description: 'Корзина',
};

export default function CheckoutLayout({ children }: { children: ReactNode }) {
	return (
		<main className='min-h-screen bg-[#F4F1EE]'>
			<Container>
				<Header showSearch={false} showCartButton={false} className='border-b-gray-200' />
				{children}
			</Container>
		</main>
	);
}
