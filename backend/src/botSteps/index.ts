import { handleStepOne } from './stepOne';
import { handleStepTwo } from './stepTwo';
import { handleStepZero } from './stepZero';

export const steps = [
	{
		step: 0,
		handleStep: handleStepZero
	},
	{
		step: 1,
		handleStep: handleStepOne
	},
	{
		step: 2,
		handleStep: handleStepTwo
	}
];