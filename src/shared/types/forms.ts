import { CommonStepForm } from '@/components/screens/common-step/common-step.interface';
import { OwnershipStepForm } from '@/components/screens/ownership-form-step/ownership-form-step.interface';
import { RegisterAddressForm } from '@/components/screens/registr-address-step/registr-address-step.interface';
import { ResidentialAddressForm } from '@/components/screens/residential-address-step/residential-address-step.interface';
import { SocialForm } from '@/components/screens/social-form-step/social-form-step.interface';

export interface FormsState {
	activeStep: number;
	common: CommonStepForm;
	ownership: OwnershipStepForm;
	registrationAddress: RegisterAddressForm;
	residentialAddress: ResidentialAddressForm;
	socialMedia: SocialForm;
}
