import { FC, useEffect } from 'react';
import styles from './sole-trader.module.scss';
import Input from '../../../ui/input/input';
import {
	Control,
	Controller,
	FieldErrors,
	UseFormGetValues,
	UseFormRegister,
	UseFormSetValue,
	UseFormWatch,
} from 'react-hook-form';
import { OwnershipStepForm } from '../ownership-form-step.interface';
import { validNubmer } from '../../../../shared/regex';
import DropFileInput from '../../../ui/drop-file-input/drop-file-input';
import Checkbox from '../../../ui/checkbox/checkbox';

interface SoleTraderProps {
	control: Control<OwnershipStepForm>;
	register: UseFormRegister<OwnershipStepForm>;
	errors: FieldErrors<OwnershipStepForm>;
	getValues: UseFormGetValues<OwnershipStepForm>;
	setValue: UseFormSetValue<OwnershipStepForm>;
	watch: UseFormWatch<OwnershipStepForm>;
}

const SoleTrader: FC<SoleTraderProps> = ({
	control,
	errors,
	register,
	getValues,
	watch,
	setValue,
}) => {
	const noContractCheckbox = watch('noContract');

	useEffect(() => {
		if (noContractCheckbox) {
			setValue('leaseСontractScan', '');
		}
	}, [noContractCheckbox]);

	return (
		<div>
			<div className={styles.itnBlock}>
				<Input
					{...register('itn', {
						required: 'Введите ИНН',
						onChange: (e) => (e.target.value = validNubmer(e.target.value)),
						maxLength: {
							value: 10,
							message: 'Не более 10 цифр',
						},
						minLength: {
							value: 10,
							message: 'Не менее 10 цифр',
						},
					})}
					label="ИНН*"
					placeholder="xxxxxxxxxx"
					error={errors.itn?.message}
					className={styles.itnInput}
				/>
				<Controller
					name="itnScan"
					control={control}
					rules={{
						required: 'Загрузите скан',
					}}
					render={({ field: { onChange, onBlur, value } }) => (
						<DropFileInput
							label="Скан ИНН*"
							error={errors.itnScan?.message}
							onChange={onChange}
							onBlur={onBlur}
							value={value}
							accept={{
								'image/jpeg': ['.jpg', '.jpeg'],
							}}
						/>
					)}
				/>
				<Input
					{...register('registerDate', {
						required: 'Введите дату регистрации',
					})}
					label="Дата регистрации*"
					type="date"
					error={errors?.registerDate?.message}
					className={styles.registerDate}
				/>
			</div>

			<div className={styles.psrnstBlock}>
				<Input
					{...register('psrnst', {
						required: 'Введите ОГРНИП',
						onChange: (e) => (e.target.value = validNubmer(e.target.value)),
						maxLength: {
							value: 15,
							message: 'Не более 15 цифр',
						},
						minLength: {
							value: 15,
							message: 'Не менее 15 цифр',
						},
					})}
					placeholder="xxxxxxxxxxxxxxx"
					label="ОГРНИП*"
					error={errors.psrnst?.message}
				/>
				<Controller
					name="psrnstScan"
					control={control}
					rules={{
						required: 'Загрузите скан',
					}}
					render={({ field: { onChange, onBlur, value } }) => (
						<DropFileInput
							label="Скан ОГРНИП*"
							error={errors.psrnstScan?.message}
							onChange={onChange}
							onBlur={onBlur}
							value={value}
							accept={{
								'image/jpeg': ['.jpg', '.jpeg'],
							}}
						/>
					)}
				/>
			</div>

			<div className={styles.contractBlock}>
				<Controller
					name="leaseСontractScan"
					control={control}
					rules={{
						validate: {
							required: (value) => {
								if (!value && !getValues('noContract'))
									return 'Загрузите скан, или установите флаг ниже';
								return true;
							},
						},
					}}
					render={({ field: { onChange, onBlur, value } }) => (
						<DropFileInput
							label="Скан договора аренды помещения (офиса)"
							error={errors.leaseСontractScan?.message}
							onChange={onChange}
							onBlur={onBlur}
							value={value}
							disabled={!!noContractCheckbox}
							accept={{
								'image/jpeg': ['.jpg', '.jpeg'],
							}}
						/>
					)}
				/>
				<Controller
					name="stateRegisterSTScan"
					control={control}
					rules={{
						required: 'Загрузите скан',
					}}
					render={({ field: { onChange, onBlur, value } }) => (
						<DropFileInput
							label="Скан выписки из ЕГРИП (не старше 3 месяцев)*"
							error={errors.stateRegisterSTScan?.message}
							onChange={onChange}
							onBlur={onBlur}
							value={value}
							accept={{
								'image/jpeg': ['.jpg', '.jpeg'],
							}}
						/>
					)}
				/>
			</div>

			<div className={styles.checkbox}>
				<Checkbox {...register('noContract')}>Нет договора</Checkbox>
			</div>
		</div>
	);
};

export default SoleTrader;
