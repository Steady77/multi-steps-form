import { FC } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';

import Button from '@/ui/button/button';
import FormHeader from '@/ui/form-header/form-header';
import Select from '@/ui/select/select';

import { useAutocomplete } from '@/hooks/use-autocomplete';
import { useFormsState } from '@/hooks/use-forms-state';

import icon from '@/assets/images/ownership-form-icon.svg';

import Layout from '../../layout/layout';

import LimitedLiabilityCompany from './limited-liability-company/limited-liability-company';
import { activityOptions } from './ownership-form-step.data';
import { OwnershipStepForm } from './ownership-form-step.interface';
import styles from './ownership-form-step.module.scss';
import SoleTrader from './sole-trader/sole-trader';

const OwnershipFormStep: FC = () => {
	const navigate = useNavigate();
	const { formsState, setFormsState } = useFormsState();

	const {
		handleSubmit,
		control,
		watch,
		register,
		formState: { errors },
		setValue,
		getValues,
	} = useForm<OwnershipStepForm>({
		mode: 'onChange',
		defaultValues: formsState.ownership,
	});

	const activity = watch('activity');
	const itn = watch('itn');

	useAutocomplete(setValue, itn);

	const onSubmit = (data: OwnershipStepForm) => {
		setFormsState((state) => ({
			...state,
			ownership: { ...data },
			activeStep: state.activeStep + 1,
		}));
		navigate('/register-address');
	};

	const prevStep = () => {
		setFormsState((state) => ({
			...state,
			activeStep: state.activeStep - 1,
		}));
		navigate('/');
	};

	return (
		<Layout>
			<section>
				<FormHeader
					icon={icon}
					title="Форма собственности"
					text="Выберите форму собственности и заполните данные"
				/>
				<form onSubmit={handleSubmit(onSubmit)}>
					<div className={styles.form}>
						<div className={styles.selectWrapper}>
							<Controller
								name="activity"
								control={control}
								rules={{
									required: 'Выберите вид деятельности',
								}}
								render={({ field, fieldState: { error } }) => (
									<Select
										options={activityOptions}
										error={error}
										field={field}
										label="Вид деятельности*"
										placeholder="Выбрать"
									/>
								)}
							/>
						</div>
						{activity === activityOptions[1].value && (
							<LimitedLiabilityCompany
								control={control}
								register={register}
								errors={errors}
							/>
						)}
						{activity === activityOptions[0].value && (
							<SoleTrader
								setValue={setValue}
								watch={watch}
								getValues={getValues}
								control={control}
								register={register}
								errors={errors}
							/>
						)}
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

export default OwnershipFormStep;
