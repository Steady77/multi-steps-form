import { FC } from 'react';
import ReactSelect, { OnChangeValue } from 'react-select';

import { Option, SelectProps } from './select.interface';
import styles from './select.module.scss';

const Select: FC<SelectProps> = ({
	label,
	error,
	options,
	field,
	isLoading,
	isMulti,
	placeholder = '',
}) => {
	const onChange = (newValue: OnChangeValue<Option, boolean>) => {
		field.onChange(
			isMulti
				? (newValue as Option[]).map((item: Option) => item.value)
				: (newValue as Option).value,
		);
	};

	const getValue = () => {
		if (field.value) {
			return isMulti
				? options.filter((option) => field.value.indexOf(option.value) >= 0)
				: options.find((option) => option.value === field.value);
		} else {
			return isMulti ? [] : ('' as any);
		}
	};

	return (
		<div className={styles.selectContainer}>
			<p>{label}</p>
			<ReactSelect
				classNamePrefix="custom-select"
				placeholder={placeholder}
				options={options}
				value={getValue()}
				onChange={onChange}
				isLoading={isLoading}
				isMulti={isMulti}
			/>
			{error && <div className={styles.error}>{error.message}</div>}
		</div>
	);
};

export default Select;
