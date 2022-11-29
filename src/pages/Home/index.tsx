import { HandPalm, Play } from 'phosphor-react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as zod from 'zod';
import { createContext, useEffect, useState } from 'react';
import { differenceInSeconds } from 'date-fns';

import {
	HomeContainer,
	StartCountdownButton,
	StopCountdownButton
} from './styles';
import { NewCycleForm } from './components/NewCycleForm';
import { Countdown } from './components/Countdown';

interface Cycle {
	id: string;
	task: string;
	minutesAmount: number;
	startDate: Date;
	interruptedDate?: Date;
	finishedDate?: Date;
}

interface CyclesContextType {
	activeCycle: Cycle | undefined;
	activeCycleId: string | null;
	markCurrentCycleAsFinished: () => void;
}

export const CyclesContext = createContext({} as CyclesContextType);

// entendendo sobre controlled / uncontrolled

/* function handleSubmit(event) {
		event.target.task.value;
	}

	<form onSubmit={handleSubmit}> 

	const [task, setTask] = useState('')

	function resetForm() {
		setTask('');
	} */

export function Home() {
	const [cycles, setCycles] = useState<Cycle[]>([]);
	const [activeCycleId, setActiveCycleId] = useState<string | null>(null);

	const activeCycle = cycles.find((cycle) => cycle.id === activeCycleId);

	function markCurrentCycleAsFinished() {
		setCycles((state) =>
			state.map((cycle) => {
				if (cycle.id === activeCycleId) {
					return { ...cycle, finishedDate: new Date() };
				} else {
					return cycle;
				}
			})
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

	function handleInterruptCycle() {
		setCycles((state) =>
			state.map((cycle) => {
				if (cycle.id === activeCycleId) {
					return { ...cycle, interruptedDate: new Date() };
				} else {
					return cycle;
				}
			})
		);
		setActiveCycleId(null);
	}

	// const task = watch('task')
	// const isSubmitDisable = !task

	// console.log(cycles);

	/**
	 *  Prop Drilling -> QUando a gente tem MUITAS propriedades APENAS para comunicação entre componentes.
	 * Context API -> Permite compartilhar informações entre VÁRIOS componentes ao mesmo tempo.
	 */

	return (
		<HomeContainer>
			<form /* onSubmit={handleSubmit(handleCreateNewCycle)} */>
				<CyclesContext.Provider
					value={{
						activeCycle,
						activeCycleId,
						markCurrentCycleAsFinished
					}}>
					{/* <NewCycleForm /> */}
					<Countdown />
				</CyclesContext.Provider>

				{activeCycle ? (
					<StopCountdownButton
						onClick={handleInterruptCycle}
						type="button">
						<HandPalm size={24} />
						Interromper
					</StopCountdownButton>
				) : (
					<StartCountdownButton
						/* disabled={isSubmitDisable} */ type="submit">
						<Play size={24} />
						Começar
					</StartCountdownButton>
				)}
			</form>
		</HomeContainer>
	);
}
