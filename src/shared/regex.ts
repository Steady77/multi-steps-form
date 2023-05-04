export const validText = () => /^[a-zа-яё]+$/i;

export const validNubmer = (value: string) => {
	return value.replace(/[^0-9]/g, '');
};
