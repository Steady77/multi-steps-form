import { CommonStepForm } from '../../components/screens/common-step/common-step.interface';
import { OwnershipStepForm } from '../../components/screens/ownership-form-step/ownership-form-step.interface';
import { RegisterAddressForm } from '../../components/screens/registr-address-step/registr-address-step.interface';

export interface FormsState {
	activeStep: number;
	common: CommonStepForm;
	ownership: OwnershipStepForm;
	registrationAddress: RegisterAddressForm;
}
