import { FC, MouseEvent } from 'react';
import { useFieldArray, useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';

import Button from '../../ui/button/button';
import FormHeader from '../../ui/form-header/form-header';

import { useFormsState } from '../../../hooks/use-forms-state';

import plusIcon from '../../../assets/images/plus-icon.svg';
import icon from '../../../assets/images/social-form-icon.svg';

import Layout from '../../layout/layout';

import { SocialForm } from './social-form-step.interface';
import styles from './social-form-step.module.scss';
import SocialItem from './social-item/social-item';

const SocialFormStep: FC = () => {
	const navigate = useNavigate();
	const { formsState, setFormsState } = useFormsState();

	const {
		handleSubmit,
		control,
		register,
		formState: { errors },
	} = useForm<SocialForm>({
		mode: 'onChange',
		defaultValues: formsState.socialMedia,
	});

	const { fields, append, remove } = useFieldArray({
		name: 'social',
		control,
	});

	const onSubmit = (data: SocialForm) => {
		setFormsState((state) => ({
			...state,
			socialMedia: { ...data },
		}));

		console.log({
			common: { ...formsState.common },
			ownership: { ...formsState.ownership },
			registrationAddress: { ...formsState.registrationAddress },
			residentialAddress: { ...formsState.residentialAddress },
			socialMedia: { ...data },
		});

		alert('JSON в консоли');
	};

	const prevStep = () => {
		setFormsState((state) => ({
			...state,
			activeStep: state.activeStep - 1,
		}));
		navigate('/residential-address');
	};

	const addSocialItem = (e: MouseEvent) => {
		e.preventDefault();
		append({ name: '', link: '' });
	};

	return (
		<Layout>
			<section>
				<FormHeader
					icon={icon}
					title="Социальные сети"
					text="Введите свои действуйющие ссылки на социальные сети и количество подписчиков."
				/>
				<form onSubmit={handleSubmit(onSubmit)}>
					<ul>
						{fields.map((field, index) => (
							<SocialItem
								key={field.id}
								control={control}
								index={index}
								register={register}
								errors={errors}
								remove={remove}
							/>
						))}
					</ul>

					<Button
						className={styles.addSocialButton}
						onClick={addSocialItem}
						variant="text"
					>
						<img src={plusIcon} alt="add social button" />
						Добавить социальную сеть
					</Button>

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

export default SocialFormStep;
