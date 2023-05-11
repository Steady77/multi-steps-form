import { ResidentialAddressForm } from '../residential-address-step/residential-address-step.interface';

export interface RegisterAddressForm
	extends Omit<ResidentialAddressForm, 'addressIsMatch'> {
	country: string;
	region: string;
	registrationCity: string;
	street: string;
	house?: string;
	apartment?: string;
	noApartment: boolean;
	apartmentRegistrDate: string;
}
