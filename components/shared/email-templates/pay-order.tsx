import React, { FC } from 'react';

type Props = {
	orderId: number;
	totalAmount: number;
	paymentUrl: string;
};

export const PayOrder: FC<Props> = ({ orderId, totalAmount, paymentUrl }) => {
	return (
		<div>
			<h1>Заказ #{orderId}</h1>

			<p>
				Оплатите заказ на сумму <b>{totalAmount} Р</b>. Перейдите по <a href={paymentUrl}>ссылке</a>{' '}
				для оплаты заказа.
			</p>
		</div>
	);
};
