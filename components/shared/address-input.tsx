'use client';

import React from 'react';
import { AddressSuggestions } from 'react-dadata';
import 'react-dadata/dist/react-dadata.css';


interface Props {
	onChange?: (value?: string) => void;
}

export const AddressInput: React.FC<Props> = ({ onChange }) => {
	return (
		<AddressSuggestions
			token={'c92a69445013054a4bed589097da36589a8519c0'}
			onChange={(data) => onChange?.(data?.value)}
		/>
	);
};
