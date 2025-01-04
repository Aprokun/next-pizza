import React, { FC } from 'react';
import { WhiteBlock } from './white-block';
import { FormInput } from './form/form-input';

type Props = {
	className?: string;
};

export const CheckoutUserInfo: FC<Props> = ({ className }) => {
	return (
		<WhiteBlock title='2.Персональные данные' className={className}>
			<div className='grid grid-cols-2 gap-5'>
				<FormInput name='firstName' className='text-base' placeholder='Имя' />
				<FormInput name='lastName' className='text-base' placeholder='Фамилия' />
				<FormInput name='email' className='text-base' placeholder='Email' />
				<FormInput name='phone' className='text-base' placeholder='Номер телефона' />
			</div>
		</WhiteBlock>
	);
};
