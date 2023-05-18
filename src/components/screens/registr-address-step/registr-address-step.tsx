import { FC, useEffect } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';

import Button from '../../ui/button/button';
import Checkbox from '../../ui/checkbox/checkbox';
import FormHeader from '../../ui/form-header/form-header';
import Input from '../../ui/input/input';
import Select from '../../ui/select/select';

import { useFormsState } from '../../../hooks/use-forms-state';

import icon from '../../../assets/images/registr-address-form-icon.svg';

import Layout from '../../layout/layout';

import { countryOptions, regionOptions } from './registr-address-step.data';
import { RegisterAddressForm } from './registr-address-step.interface';
import styles from './registr-address-step.module.scss';

const RegistrAddressStep: FC = () => {
	const navigate = useNavigate();
	const { formsState, setFormsState } = useFormsState();

	const {
		handleSubmit,
		control,
		register,
		formState: { errors },
		getValues,
		watch,
		setValue,
	} = useForm<RegisterAddressForm>({
		mode: 'onChange',
		defaultValues: formsState.registrationAddress,
	});

	const isNoApartment = watch('noApartment');

	useEffect(() => {
		if (isNoApartment) {
			setValue('house', '');
			setValue('apartment', '');
		}
	}, [isNoApartment]);

	const onSubmit = (data: RegisterAddressForm) => {
		setFormsState((state) => ({
			...state,
			registrationAddress: { ...data },
			activeStep: state.activeStep + 1,
		}));

		navigate('/residential-address');
	};

	const prevStep = () => {
		setFormsState((state) => ({
			...state,
			activeStep: state.activeStep - 1,
		}));
		navigate('/ownership-form');
	};

	const apartmentRequiredRule = (value: string | undefined) => {
		if (!value && !getValues('noApartment')) return 'Укажите';
		return true;
	};

	return (
		<Layout>
			<section>
				<FormHeader
					icon={icon}
					title="Адрес регистрации"
					text="Введите свой действуйющий адрес прописки."
				/>
				<form onSubmit={handleSubmit(onSubmit)}>
					<div className={styles.addressBlock}>
						<div className={styles.selectWrapper}>
							<Controller
								name="country"
								control={control}
								rules={{
									required: 'Выберите страну',
								}}
								render={({ field, fieldState: { error } }) => (
									<Select
										options={countryOptions}
										error={error}
										field={field}
										label="Страна*"
										placeholder="Выберите страну"
									/>
								)}
							/>
						</div>
						<div className={styles.selectWrapper}>
							<Controller
								name="region"
								control={control}
								rules={{
									required: 'Выберите регион',
								}}
								render={({ field, fieldState: { error } }) => (
									<Select
										options={regionOptions}
										error={error}
										field={field}
										label="Регион*"
										placeholder="Выберите регион"
									/>
								)}
							/>
						</div>
						<Input
							{...register('registrationCity', {
								required: 'Введите город',
							})}
							label="Город / Населенный пункт*"
							placeholder="Введите населенный пункт"
							error={errors.registrationCity?.message}
						/>
						<Input
							{...register('street', {
								required: 'Введите улицу',
							})}
							label="Улица*"
							placeholder="Введите улицу"
							error={errors.street?.message}
						/>

						<div className={styles.apartmentBlock}>
							<Input
								{...register('house', {
									disabled: !!isNoApartment,
									validate: {
										required: apartmentRequiredRule,
									},
								})}
								label="Дом*"
								placeholder="0"
								error={errors.house?.message}
								className={styles.house}
							/>
							<Input
								{...register('apartment', {
									disabled: !!isNoApartment,
									validate: {
										required: apartmentRequiredRule,
									},
								})}
								label="Квартира*"
								placeholder="0"
								error={errors.apartment?.message}
								className={styles.apartment}
							/>
							<div className={styles.checkbox}>
								<Checkbox {...register('noApartment')}>Нет квартиры</Checkbox>
							</div>
						</div>
						<Input
							{...register('apartmentRegistrDate', {
								required: 'Введите дату прописки',
							})}
							label="Дата прописки*"
							type="date"
							error={errors?.apartmentRegistrDate?.message}
							className={styles.registerDate}
						/>
					</div>
					<div className={styles.buttons}>
						<Button variant="text" onClick={prevStep}>
							Назад
						</Button>
						<Button type="submit">Далее</Button>
					</div>
				</form>
			</section>
		</Layout>
	);
};

export default RegistrAddressStep;
