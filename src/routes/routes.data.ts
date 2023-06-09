import { FC } from 'react';

import CommonStep from '@/components/screens/common-step/common-step';
import OwnershipFormStep from '@/components/screens/ownership-form-step/ownership-form-step';
import RegistrAddressStep from '@/components/screens/registr-address-step/registr-address-step';
import ResidentialAddressStep from '@/components/screens/residential-address-step/residential-address-step';
import SocialFormStep from '@/components/screens/social-form-step/social-form-step';

interface Routes {
	path: string;
	component: FC;
}

export const routes: Routes[] = [
	{
		path: '/',
		component: CommonStep,
	},
	{
		path: '/ownership-form',
		component: OwnershipFormStep,
	},
	{
		path: '/register-address',
		component: RegistrAddressStep,
	},
	{
		path: '/residential-address',
		component: ResidentialAddressStep,
	},
	{
		path: '/social-form',
		component: SocialFormStep,
	},
];
