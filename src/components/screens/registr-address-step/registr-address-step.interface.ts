export interface RegisterAddressForm {
	country: string;
	region: string;
	registrationCity: string;
	street: string;
	house?: string;
	apartment?: string;
	noApartment: boolean;
	apartmentRegistrDate: string;
}
