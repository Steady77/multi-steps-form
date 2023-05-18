import cn from 'classnames';
import { FC } from 'react';
import Dropzone, { Accept } from 'react-dropzone';
import { Noop } from 'react-hook-form';

import cross from '../../../assets/images/cross-icon.svg';
import done from '../../../assets/images/✓.svg';

import UploadIcon from '../icons/upload-icon';

import styles from './drop-file-input.module.scss';

interface FileInputProps {
	label: string;
	className?: string;
	error?: string;
	onChange: (...event: any[]) => void;
	onBlur: Noop;
	accept: Accept;
	value: any;
	disabled?: boolean;
}

const DropFileInput: FC<FileInputProps> = ({
	className,
	label,
	error,
	onChange,
	onBlur,
	accept,
	value,
	disabled,
}) => {
	return (
		<Dropzone
			disabled={disabled}
			maxFiles={1}
			maxSize={5_000_000}
			accept={accept}
			onDrop={onChange}
		>
			{({ getRootProps, getInputProps, isDragActive }) => (
				<div {...getRootProps()} className={cn(styles.inputWrap, className)}>
					<p className={styles.label}>{label}</p>
					<div className={styles.field}>
						<div
							className={cn(styles.fieldText, {
								[styles.dragActive]: isDragActive,
							})}
						>
							{value
								? value.map((item: any, idx: number) => (
										<div className={styles.fileName} key={idx}>
											<img src={done} alt="done" />
											<span>{item.name}</span>
											<img src={cross} alt="close" />
										</div>
								  ))
								: 'Выберите или перетащите файл'}
						</div>
						<div className={styles.image}>
							<UploadIcon />
						</div>
					</div>
					<input
						{...getInputProps()}
						className={styles.input}
						onBlur={onBlur}
					/>
					{error && <div className={styles.error}>{error}</div>}
				</div>
			)}
		</Dropzone>
	);
};

export default DropFileInput;
