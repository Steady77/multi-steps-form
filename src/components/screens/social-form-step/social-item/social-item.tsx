import { FC } from 'react';
import styles from './social-item.module.scss';
import {
	Control,
	Controller,
	FieldErrors,
	UseFieldArrayRemove,
	UseFormRegister,
	useWatch,
} from 'react-hook-form';
import Select from '../../../ui/select/select';
import Input from '../../../ui/input/input';
import crossIcon from '../../../../assets/images/cross-icon.svg';
import { socialOptions } from '../social-form-step.data';
import { SocialForm } from '../social-form-step.interface';

interface SocialItemProps {
	control: Control<SocialForm>;
	register: UseFormRegister<SocialForm>;
	errors: FieldErrors<SocialForm>;
	remove: UseFieldArrayRemove;
	index: number;
}

const SocialItem: FC<SocialItemProps> = ({
	control,
	index,
	register,
	errors,
	remove,
}) => {
	const watchedFields = useWatch({
		name: 'social',
		control,
	});

	return (
		<li className={styles.socialItem}>
			<div className={styles.selectWrapper}>
				<Controller
					name={`social.${index}.name`}
					control={control}
					rules={{
						required: 'Укажите соц. сеть',
					}}
					render={({ field, fieldState: { error } }) => (
						<Select
							options={socialOptions}
							error={error}
							field={field}
							label="Сайт / Приложение*"
							placeholder="Выбрать"
						/>
					)}
				/>
			</div>
			{watchedFields?.[index]?.name && (
				<>
					<Input
						{...register(`social.${index}.link`, {
							required: 'Введите ссылку',
						})}
						placeholder={`${watchedFields?.[index]?.name}.com/example`}
						error={errors.social?.[index]?.link?.message}
					></Input>

					<img
						onClick={() => remove(index)}
						className={styles.deleteIcon}
						src={crossIcon}
						alt="close icon"
					/>
				</>
			)}
		</li>
	);
};

export default SocialItem;
