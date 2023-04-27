import { FieldError } from 'react-hook-form';
import { ControllerRenderProps } from 'react-hook-form';
import { Options } from 'react-select';

export interface Option {
	label: string;
	value: string;
}

export interface SelectProps {
	options: Options<Option>;
	field: ControllerRenderProps<any, any>;
	label: string;
	isLoading?: boolean;
	isMulti?: boolean;
	error?: FieldError | undefined;
	placeholder?: string;
}
