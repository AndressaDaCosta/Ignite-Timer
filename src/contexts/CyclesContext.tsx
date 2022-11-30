import { differenceInSeconds } from 'date-fns';
import {
	createContext,
	ReactNode,
	useEffect,
	useReducer,
	useState
} from 'react';

import {
	// ActionTypes,
	addNewCycleAction,
	interruptCurrentCycleAction,
	markCurrentCycleAsFinishedAction
} from '../reducers/cycles/actions';

import { Cycle, cyclesReducer } from '../reducers/cycles/reducer';
interface CreateCycleData {
	task: string;
	minutesAmount: number;
}

interface CyclesContextType {
	cycles: Cycle[];
	activeCycle: Cycle | undefined;
	activeCycleId: string | null;
	amountSecondsPassed: number;
	markCurrentCycleAsFinished: () => void;
	setSecondsPassed: (seconds: number) => void;
	createNewCycle: (data: CreateCycleData) => void;
	interruptCurrentCycle: () => void;
}

export const CyclesContext = createContext({} as CyclesContextType);

interface CyclesContextProviderProps {
	children: ReactNode;
}

export function CyclesContextProvider({
	children
}: CyclesContextProviderProps) {
	// const [cycles, setCycles] = useState<Cycle[]>([]);
	// const [cyclesState, dispatch] = useReducer(cyclesReducer, {
	// 	cycles: [],
	// 	activeCycleId: null
	// });

	const [cyclesState, dispatch] = useReducer(
		cyclesReducer,
		{
			cycles: [],
			activeCycleId: null
		},
		() => {
			const storedStateAsJSON: string | null = localStorage.getItem(
				'@ignite-timer:cycles-state-1.0.0'
			);

			if (storedStateAsJSON) {
				return JSON.parse(storedStateAsJSON);
			}
			return {
				cycles: [],
				activeCycleId: null
			};
		}
	);

	const { cycles, activeCycleId } = cyclesState;

	const activeCycle = cycles.find((cycle) => cycle.id === activeCycleId);

	// const [activeCycleId, setActiveCycleId] = useState<string | null>(null);
	// const [amountSecondsPassed, setAmountSecondsPassed] = useState(0);

	const [amountSecondsPassed, setAmountSecondsPassed] = useState(() => {
		if (activeCycle) {
			return differenceInSeconds(
				new Date(),
				new Date(activeCycle.startDate)
			);
		}

		return 0;
	});

	useEffect(() => {
		const stateJSON = JSON.stringify(cyclesState);

		localStorage.setItem('@ignite-timer:cycles-state-1.0.0', stateJSON);
	}, [cyclesState]);

	function setSecondsPassed(seconds: number) {
		setAmountSecondsPassed(seconds);
	}

	function markCurrentCycleAsFinished() {
		// setCycles((state) =>

		// 	state.map((cycle) => {
		// 		if (cycle.id === activeCycleId) {
		// 			return { ...cycle, finishedDate: new Date() };
		// 		} else {
		// 			return cycle;
		// 		}
		// 	})
		// );

		// dispatch({
		// 	type: ActionTypes.MARK_CURRENT_CYCLE_AS_FINISHED,
		// 	payload: {
		// 		activeCycleId
		// 	}
		// });
		dispatch(markCurrentCycleAsFinishedAction());
	}

	function createNewCycle(data: CreateCycleData) {
		const id = String(new Date().getTime());

		const newCycle: Cycle = {
			id,
			task: data.task,
			minutesAmount: data.minutesAmount,
			startDate: new Date()
		};

		// setCycles((state) => [...state, newCycle]);

		// dispatch({
		// 	type: ActionTypes.ADD_NEW_CYCLE,
		// 	payload: {
		// 		newCycle
		// 	}
		// });
		dispatch(addNewCycleAction(newCycle));

		// setActiveCycleId(id);
		setAmountSecondsPassed(0);
	}

	function interruptCurrentCycle() {
		// setCycles((state) =>
		// 	state.map((cycle) => {
		// 		if (cycle.id === activeCycleId) {
		// 			return { ...cycle, interruptedDate: new Date() };
		// 		} else {
		// 			return cycle;
		// 		}
		// 	})
		// );

		// dispatch({
		// 	type: ActionTypes.INTERRUPT_CURRENT_CYCLE,
		// 	payload: {
		// 		activeCycleId
		// 	}
		// });

		dispatch(interruptCurrentCycleAction());

		// setActiveCycleId(null);
	}

	return (
		<CyclesContext.Provider
			value={{
				cycles,
				activeCycle,
				activeCycleId,
				markCurrentCycleAsFinished,
				amountSecondsPassed,
				setSecondsPassed,
				createNewCycle,
				interruptCurrentCycle
			}}>
			{children}
		</CyclesContext.Provider>
	);
}
