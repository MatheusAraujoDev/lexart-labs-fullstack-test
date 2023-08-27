import { handleStepOne } from './stepOne';
import { handleStepZero } from './stepZero';

export const steps = [
	{
		step: 0,
		handleStep: handleStepZero
	},
	{
		step: 1,
		handleStep: handleStepOne
	}
];