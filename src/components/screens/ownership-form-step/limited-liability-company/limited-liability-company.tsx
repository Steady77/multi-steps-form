import { FC } from 'react';
import {
	Control,
	Controller,
	FieldErrors,
	UseFormRegister,
} from 'react-hook-form';

import DropFileInput from '../../../ui/drop-file-input/drop-file-input';
import Input from '../../../ui/input/input';

import { validNubmer } from '../../../../shared/regex';
import { OwnershipStepForm } from '../ownership-form-step.interface';

import styles from './limited-liability-company.module.scss';

interface LLCProps {
	control: Control<OwnershipStepForm>;
	register: UseFormRegister<OwnershipStepForm>;
	errors: FieldErrors<OwnershipStepForm>;
}

const LimitedLiabilityCompany: FC<LLCProps> = ({
	control,
	errors,
	register,
}) => {
	return (
		<div>
			<div className={styles.nameBlock}>
				<Input
					{...register('fullCompanyName', {
						required: 'Введите наименование',
					})}
					label="Наименование полное*"
					placeholder="ООО «Московская промышленная компания»"
					error={errors?.fullCompanyName?.message}
					className={styles.fullName}
				/>
				<Input
					{...register('shortCompanynName', {
						required: 'Введите наименование',
					})}
					label="Сокращение*"
					placeholder="ООО «МПК»"
					error={errors?.shortCompanynName?.message}
					className={styles.shortName}
				/>
			</div>

			<div className={styles.itnBlock}>
				<Input
					{...register('registerDate', {
						required: 'Введите дату регистрации',
					})}
					label="Дата регистрации*"
					type="date"
					error={errors?.registerDate?.message}
					className={styles.registerDate}
				/>
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
					placeholder="xxxxxxxxxx"
					label="ИНН*"
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
			</div>

			<div className={styles.psrnBlock}>
				<Input
					{...register('psrn', {
						required: 'Введите ОГРН',
						onChange: (e) => (e.target.value = validNubmer(e.target.value)),
						maxLength: {
							value: 13,
							message: 'Не более 13 цифр',
						},
						minLength: {
							value: 13,
							message: 'Не менее 13 цифр',
						},
					})}
					placeholder="xxxxxxxxxxxxx"
					label="ОГРН*"
					error={errors.psrn?.message}
					className={styles.psrnInput}
				/>
				<Controller
					name="psrnScan"
					control={control}
					rules={{
						required: 'Загрузите скан',
					}}
					render={({ field: { onChange, onBlur, value } }) => (
						<DropFileInput
							label="Скан ОГРН*"
							error={errors.psrnScan?.message}
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
		</div>
	);
};

export default LimitedLiabilityCompany;
