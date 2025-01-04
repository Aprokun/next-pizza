import React, { FC } from 'react';
import { WhiteBlock } from './white-block';
import { CheckoutItemDetails } from './checkout-item-details';
import { ArrowRight, Box, Car, Percent } from 'lucide-react';
import { Button } from '../ui/button';
import { Skeleton } from '../ui/skeleton';
import { SkeletonFieldWrapper } from './skeleton-field-wrapper';

const DELIVERY_PRICE = 500;
const SERVICE_PERCENT_PRICE = 5;

type Props = {
	totalAmount: number;
	loading: boolean;
};

export const CheckoutSidebar: FC<Props> = ({ totalAmount, loading }) => {
	const servicePrice = (totalAmount * SERVICE_PERCENT_PRICE) / 100;
	const totalPrice = totalAmount + servicePrice + DELIVERY_PRICE;

	return (
		<div className='w-[450px]'>
			<WhiteBlock className='p-6 sticky top-4'>
				<div className='flex flex-col gap-1'>
					<span className='text-xl'>Итого</span>
					<SkeletonFieldWrapper loading={loading} skeletonClassName='h-11 w-48'>
						<span className='h-11 text-[34px] font-extrabold'>{totalPrice} Р</span>
					</SkeletonFieldWrapper>
				</div>

				<CheckoutItemDetails
					title={
						<>
							<Box size={24} className='mr-2 text-gray-300' />
							Стоимость товаров
						</>
					}
					value={
						<SkeletonFieldWrapper loading={loading} skeletonClassName='h-6 w-16 rounded-[6px]'>
							{totalAmount} Р
						</SkeletonFieldWrapper>
					}
				/>
				<CheckoutItemDetails
					title={
						<>
							<Percent size={24} className='mr-2 text-gray-300' />
							Сервисный сбор
						</>
					}
					value={
						<SkeletonFieldWrapper loading={loading} skeletonClassName='h-6 w-16 rounded-[6px]'>
							{servicePrice} Р
						</SkeletonFieldWrapper>
					}
				/>
				<CheckoutItemDetails
					title={
						<>
							<Car size={24} className='mr-2 text-gray-300' />
							Доставка
						</>
					}
					value={
						<SkeletonFieldWrapper loading={loading} skeletonClassName='h-6 w-16 rounded-[6px]'>
							{DELIVERY_PRICE} Р
						</SkeletonFieldWrapper>
					}
				/>

				<Button
					loading={loading}
					type='submit'
					className='w-full h-14 rounded-2xl mt-6 text-base font-bold'
				>
					Перейти к оплате
					<ArrowRight className='w-5 ml-2' />
				</Button>
			</WhiteBlock>
		</div>
	);
};
