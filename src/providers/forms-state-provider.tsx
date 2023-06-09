import {
	Dispatch,
	FC,
	PropsWithChildren,
	SetStateAction,
	createContext,
	useState,
} from 'react';

import { FormsState } from '@/shared/types/forms';

interface FormsContext {
	formsState: FormsState;
	setFormsState: Dispatch<SetStateAction<FormsState>>;
}

const initialState: FormsState = {
	activeStep: 1,
	common: {
		birthPlace: '',
		birthday: '',
		citizenship: '',
		city: '',
		gender: 'male',
		name: '',
		patronymic: '',
		surname: '',
	},
	ownership: {
		activity: '',
	},
	registrationAddress: {
		country: '',
		noApartment: false,
		region: '',
		registrationCity: '',
		apartmentRegistrDate: '',
		street: '',
	},
	residentialAddress: {
		country: '',
		noApartment: false,
		region: '',
		registrationCity: '',
		apartmentRegistrDate: '',
		street: '',
		addressIsMatch: false,
	},
	socialMedia: {
		social: [{ name: '', link: '' }],
	},
};

export const FormsStateContext = createContext<FormsContext>(
	{} as FormsContext,
);

const FormsStateProvider: FC<PropsWithChildren> = ({ children }) => {
	const [formsState, setFormsState] = useState<FormsState>(initialState);

	return (
		<FormsStateContext.Provider value={{ formsState, setFormsState }}>
			{children}
		</FormsStateContext.Provider>
	);
};

export default FormsStateProvider;
