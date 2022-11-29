import { HandPalm, Play } from 'phosphor-react';
import { FormProvider, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as zod from 'zod';
import { useContext } from 'react';

import {
	HomeContainer,
	StartCountdownButton,
	StopCountdownButton
} from './styles';
import { NewCycleForm } from './Components/NewCycleForm';
import { Countdown } from './Components/Countdown';
import { CyclesContext } from '../../contexts/CyclesContext';

const newCycleFormValidationSchema = zod.object({
	task: zod.string().min(1, 'Informe a tarefa'),
	minutesAmount: zod
		.number()
		.min(5, 'O ciclo precisa ser de no mínimo 5 minutos.')
		.max(60, 'O ciclo precisa ser de no máximo 60 minutos.')
});

type NewCycleFormData = zod.infer<typeof newCycleFormValidationSchema>;

export function Home() {
	const { activeCycle, createNewCycle, interruptCurrentCycle } =
		useContext(CyclesContext);

	const newCycleForm = useForm<NewCycleFormData>({
		resolver: zodResolver(newCycleFormValidationSchema),
		defaultValues: {
			task: '',
			minutesAmount: 0
		}
	});

	const { handleSubmit, watch /* reset */ } = newCycleForm;

	const task = watch('task');
	const isSubmitDisable = !task;

	return (
		<HomeContainer>
			<form onSubmit={handleSubmit(createNewCycle)}>
				<FormProvider {...newCycleForm}>
					<NewCycleForm />
				</FormProvider>
				<Countdown />

				{activeCycle ? (
					<StopCountdownButton
						onClick={interruptCurrentCycle}
						type="button">
						<HandPalm size={24} />
						Interromper
					</StopCountdownButton>
				) : (
					<StartCountdownButton
						disabled={isSubmitDisable}
						type="submit">
						<Play size={24} />
						Começar
					</StartCountdownButton>
				)}
			</form>
		</HomeContainer>
	);
}
// function handleCreateNewCycle(data: NewCycleFormData) {
//   const id = String(new Date().getTime())

//   const newCycle: Cycle = {
//     id,
//     task: data.task,
//     minutesAmount: data.minutesAmount,
//     startDate: new Date(),
//   }

//   setCycles((state) => [...state, newCycle])
//   setActiveCycleId(id)
//   setAmountSecondsPassed(0)

//   reset()
// }

// console.log(cycles);

/**
 *  Prop Drilling -> QUando a gente tem MUITAS propriedades APENAS para comunicação entre componentes.
 * Context API -> Permite compartilhar informações entre VÁRIOS componentes ao mesmo tempo.
 */
