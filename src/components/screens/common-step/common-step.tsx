import { FC } from 'react';
import Layout from '../../layout/layout';
import styles from './common-step.module.scss';
import icon from '../../../assets/images/common-form-icon.svg';
import Input from '../../ui/input/input';
import Select from '../../ui/select/select';
import { Controller, useForm } from 'react-hook-form';
import MaleIcon from '../../ui/icons/male-icon';
import FemaleIcon from '../../ui/icons/female-icon';
import Button from '../../ui/button/button';
import { citizenshipOptions, cityOptions } from './common-step.data';
import { CommonStepForm } from './common-step.interface';
import { useNavigate } from 'react-router-dom';
import { validText } from '../../../shared/regex';

const CommonStep: FC = () => {
	const navigate = useNavigate();

	const {
		handleSubmit,
		register,
		formState: { errors },
		control,
	} = useForm<CommonStepForm>({ mode: 'onChange' });

	const onSubmit = (data: CommonStepForm) => {
		console.log(data);
		navigate('/ownership-form');
	};

	return (
		<Layout>
			<section>
				<img className={styles.image} src={icon} alt="icon" />
				<h2 className={styles.title}>Общие</h2>
				<p className={styles.text}>Введите свои персональные данные.</p>
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
									placeholder="Санкт-Петербург"
								/>
							)}
						/>
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
									placeholder="Россия"
								/>
							)}
						/>
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
									defaultChecked
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
								pattern: {
									value: validText(),
									message: 'Только буквы',
								},
							})}
							label="Место рождения (как указано в паспорте)*"
							placeholder="Введите наименование региона и населенного пункта"
							error={errors?.birthPlace?.message}
							className={styles.bornPlace}
						/>
					</div>
					<div className={styles.buttons}>
						<Button variant="text" onClick={() => alert('Отмена')}>
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
