import { useEffect } from 'react';
import { UseFormSetValue } from 'react-hook-form';

import { OwnershipStepForm } from '@/components/screens/ownership-form-step/ownership-form-step.interface';

import { useDebounce } from './use-debounce';
import { CompanyData } from '@/shared/types/company';
import { fetchData, getKeys } from '@/shared/utils';

export const useAutocomplete = (
	setValue: UseFormSetValue<OwnershipStepForm>,
	value: string | undefined,
) => {
	const debouncedItn = useDebounce(value, 500);

	useEffect(() => {
		const getCompany = async () => {
			const data = await fetchData<CompanyData[]>('mock.json');
			const company = data.find((item) => item.itn === value);

			if (company) {
				getKeys(company).forEach((key) => {
					setValue(key, company[key]);
				});
			}
		};

		getCompany();
	}, [debouncedItn]);
};
