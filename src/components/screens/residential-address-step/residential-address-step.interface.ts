export interface ResidentialAddressForm {
	country: string;
	region: string;
	registrationCity: string;
	street: string;
	house?: string;
	apartment?: string;
	noApartment: boolean;
	apartmentRegistrDate: string;
	addressIsMatch: boolean;
}
