import { FC, useEffect } from 'react';
import Layout from '../../layout/layout';
import Button from '../../ui/button/button';
import { useFormsState } from '../../../hooks/use-forms-state';
import { useNavigate } from 'react-router-dom';
import styles from './registr-address-step.module.scss';
import { Controller, useForm } from 'react-hook-form';
import { RegisterAddressForm } from './registr-address-step.interface';
import FormHeader from '../../ui/form-header/form-header';
import icon from '../../../assets/images/registr-address-form-icon.svg';
import Select from '../../ui/select/select';
import { countryOptions, regionOptions } from './registr-address-step.data';
import Input from '../../ui/input/input';
import Checkbox from '../../ui/checkbox/checkbox';

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

	const noApartmentCheckbox = watch('noApartment');

	useEffect(() => {
		if (noApartmentCheckbox) {
			setValue('house', '');
			setValue('apartment', '');
		}
	}, [noApartmentCheckbox]);

	const onSubmit = (data: RegisterAddressForm) => {
		setFormsState((state) => ({
			...state,
			registrationAddress: { ...data },
		}));

		alert('JSON в консоли');

		console.log({
			common: { ...formsState.common },
			ownership: { ...formsState.ownership },
			registrationAddress: { ...data },
		});
	};

	const prevStep = () => {
		setFormsState((state) => ({
			...state,
			activeStep: state.activeStep - 1,
		}));
		navigate('/ownership-form');
	};

	const hasApartment = (value: string | undefined) => {
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
									disabled: !!noApartmentCheckbox,
									validate: {
										required: hasApartment,
									},
								})}
								label="Дом*"
								placeholder="0"
								error={errors.house?.message}
								className={styles.house}
							/>
							<Input
								{...register('apartment', {
									disabled: !!noApartmentCheckbox,
									validate: {
										required: hasApartment,
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
						<Button type="submit">Сохранить</Button>
					</div>
				</form>
			</section>
		</Layout>
	);
};

export default RegistrAddressStep;
