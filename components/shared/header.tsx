import React, { FC } from 'react';
import Container from '@/components/shared/container';
import { cn } from '@/shared/lib/utils';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { User } from 'lucide-react';
import Link from 'next/link';
import SearchInput from '@/components/shared/search-input';
import { CartButton } from '@/components/shared/cart-button';

type Props = {
	showSearch: boolean;
	showCartButton: boolean;
	className?: string;
};

const Header: FC<Props> = ({ showSearch = true, showCartButton = true, className }) => {
	return (
		<header className={cn(className, 'border-b')}>
			<Container className='flex items-center justify-between py-8'>
				<Link href='/'>
					<div className='flex items-center gap-4'>
						<Image src='/logo.png' alt='Logo' width={32} height={32} />

						<div>
							<h1 className='text-2xl uppercase font-black'>Next Pizza</h1>
							<p className='text-sm text-gray-400 leading-3'>супер пупер</p>
						</div>
					</div>
				</Link>

				<div className='mx-10 flex-1' hidden={!showSearch}>
					<SearchInput />
				</div>

				<div className='flex items-center gap-3'>
					<Button variant='outline' className='flex items-center gap-1'>
						<User size={16} />
						Войти
					</Button>
					<CartButton showCartButton={showCartButton} />
				</div>
			</Container>
		</header>
	);
};

export default Header;
