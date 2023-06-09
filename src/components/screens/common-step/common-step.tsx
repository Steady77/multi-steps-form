import { FC, MouseEvent, useEffect } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';

import Button from '@/ui/button/button';
import FormHeader from '@/ui/form-header/form-header';
import FemaleIcon from '@/ui/icons/female-icon';
import MaleIcon from '@/ui/icons/male-icon';
import Input from '@/ui/input/input';
import Select from '@/ui/select/select';

import { useFormsState } from '@/hooks/use-forms-state';

import icon from '@/assets/images/common-form-icon.svg';

import Layout from '../../layout/layout';

import { citizenshipOptions, cityOptions } from './common-step.data';
import { CommonStepForm } from './common-step.interface';
import styles from './common-step.module.scss';
import { validText } from '@/shared/regex';

const CommonStep: FC = () => {
	const navigate = useNavigate();
	const { formsState, setFormsState } = useFormsState();

	const {
		handleSubmit,
		register,
		formState: { errors },
		control,
	} = useForm<CommonStepForm>({
		mode: 'onChange',
		defaultValues: formsState.common,
	});

	const onSubmit = (data: CommonStepForm) => {
		setFormsState((state) => ({
			...state,
			common: { ...data },
			activeStep: state.activeStep + 1,
		}));
		navigate('/ownership-form');
	};

	const handleCancel = (e: MouseEvent<HTMLButtonElement>) => {
		e.preventDefault();
		alert('Отмена');
	};

	useEffect(() => {
		window.addEventListener('popstate', (e) => {
			e.preventDefault();
		});
	}, []);

	return (
		<Layout>
			<section>
				<FormHeader
					icon={icon}
					title="Общие"
					text="Введите свои персональные данные."
				/>
				<form onSubmit={handleSubmit(onSubmit)}>
					<div className={styles.form}>
						<Input
							{...register('surname', {
								required: 'Введите фамилию',
								pattern: {
									value: validText(),
									message: 'Только буквы',
								},
							})}
							label="Фамилия*"
							placeholder="Васильев"
							error={errors?.surname?.message}
						/>
						<Input
							{...register('name', {
								required: 'Введите имя',
								pattern: {
									value: validText(),
									message: 'Только буквы',
								},
							})}
							label="Имя*"
							placeholder="Иван"
							error={errors.name?.message}
						/>
						<Input
							{...register('patronymic', {
								required: 'Введите отчество',
								pattern: {
									value: validText(),
									message: 'Только буквы',
								},
							})}
							label="Отчество*"
							placeholder="Сергеевич"
							error={errors?.patronymic?.message}
						/>
						<div className={styles.selectWrapper}>
							<Controller
								name="city"
								control={control}
								rules={{
									required: 'Выберите город',
								}}
								render={({ field, fieldState: { error } }) => (
									<Select
										options={cityOptions}
										error={error}
										field={field}
										label="Основной город*"
										placeholder="Выберите город"
									/>
								)}
							/>
						</div>
						<div className={styles.selectWrapper}>
							<Controller
								name="citizenship"
								control={control}
								rules={{
									required: 'Выберите гражданство',
								}}
								render={({ field, fieldState: { error } }) => (
									<Select
										options={citizenshipOptions}
										error={error}
										field={field}
										label="Гражданство*"
										placeholder="Выберите гражданство"
									/>
								)}
							/>
						</div>
						<div className={styles.bornGenderBlock}>
							<Input
								{...register('birthday', {
									required: 'Введите дату рождения',
								})}
								label="Дата рождения*"
								type="date"
								error={errors?.birthday?.message}
								className={styles.bornDate}
							/>
							<div className={styles.gender}>
								<Input
									{...register('gender')}
									label="Пол*"
									type="radio"
									value="male"
									className={styles.radioBtn}
								>
									<MaleIcon /> М
								</Input>
								<Input
									{...register('gender')}
									type="radio"
									value="female"
									className={styles.radioBtn}
								>
									<FemaleIcon /> Ж
								</Input>
							</div>
						</div>

						<Input
							{...register('birthPlace', {
								required: 'Введите место рождения',
							})}
							label="Место рождения (как указано в паспорте)*"
							placeholder="Введите наименование региона и населенного пункта"
							error={errors?.birthPlace?.message}
							className={styles.bornPlace}
						/>
					</div>
					<div className={styles.buttons}>
						<Button variant="text" onClick={handleCancel}>
							Отмена
						</Button>
						<Button type="submit">Далее</Button>
					</div>
				</form>
			</section>
		</Layout>
	);
};

export default CommonStep;
