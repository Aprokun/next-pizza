import React, { FC } from 'react';
import Container from '@/components/shared/container';
import { cn } from '@/lib/utils';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { ArrowRight, ShoppingCart, User } from 'lucide-react';

type Props = {
	className?: string;
};

const Header: FC<Props> = ({ className }) => {
	return (
		<header className={cn(className, 'border border-b')}>
			<Container className='flex items-center justify-between py-8'>
				<div className='flex items-center gap-4'>
					<Image src='/logo.png' alt='Logo' width={32} height={32} />

					<div>
						<h1 className='text-2xl uppercase font-black'>Next Pizza</h1>
						<p className='text-sm text-gray-400 leading-3'>супер пупер</p>
					</div>
				</div>

				<div className='flex items-center gap-3'>
					<Button variant='outline' className='flex items-center gap-1'>
						<User size={16} />
						Войти
					</Button>
					<div>
						<Button className='group relative'>
							<b>520 RUB</b>
							<span className='h-full w-[1px] bg-white/30 mx-3'></span>
							<div className='flex items-center gap-1 transition duration-300 group-hover:opacity-0'>
								<ShoppingCart className='relative' strokeWidth={2} size={16} />
								<b>3</b>
							</div>
							<ArrowRight
								className='absolute right-5 transition duration-300 -translate-x-2 opacity-0 group-hover:opacity-100 group-hover:-translate-x-0'
								size={20}
							/>
						</Button>
					</div>
				</div>
			</Container>
		</header>
	);
};

export default Header;
