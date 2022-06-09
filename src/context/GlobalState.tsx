import { createContext, useReducer } from "react";

const initialState = {
  page: 0,
  per_page: 0,
  total: 0,
  total_pages: 0,
  data: [],
};

type AppState = typeof initialState;

type Action = {
  type: "SET_PRODUCTS";
  payload: AppState;
};

export function createGlobalState<StateType, ActionType>(
  reducer: React.Reducer<StateType, ActionType>,
  initialState: StateType
) {
  const defaultDispatch: React.Dispatch<ActionType> = () => initialState;

  const globalState = createContext({
    state: initialState,
    dispatch: defaultDispatch,
  });

  function Provider(props: React.PropsWithChildren<{}>) {
    const [state, dispatch] = useReducer<React.Reducer<StateType, ActionType>>(
      reducer,
      initialState
    );

    return <globalState.Provider value={{ state, dispatch }} {...props} />;
  }

  return [globalState, Provider] as const;
}

function reducer(state: AppState, action: Action): AppState {
  switch (action.type) {
    case "SET_PRODUCTS":
      return {
        ...state,
        ...action.payload,
      };
    default:
      return state;
  }
}

export const [GlobalState, GlobalProvider] = createGlobalState(
  reducer,
  initialState
);
