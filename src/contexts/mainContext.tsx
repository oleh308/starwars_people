import React, {
  ReactNode,
  useReducer,
  createContext
} from 'react';

type ContextState = {
  state: State
  dispatch: React.Dispatch<Action>
};

type Action =
 | { type: 'request' }
 | { type: 'updatePeople', people: [any] }
 | { type: 'failure', error: string };

type State = {
  people: any[]
};

type MainProviderProps = {
  children: ReactNode
};

const reducerInit: State = {
  people: []
};

const contextInit: ContextState = {
  state: reducerInit,
  dispatch: () => {}
}

const MainContext = createContext<ContextState>(contextInit);

function mainReducer(state: State, action: Action): State {
  switch (action.type) {
    case 'updatePeople':
      return {
        ...state,
        people: action.people
      }
  }

  return state;
}

function MainProvider({ children }: MainProviderProps) {
  const [state, dispatch] = useReducer(mainReducer, reducerInit);

  return (
    <MainContext.Provider value={{ state, dispatch }}>
      { children }
    </MainContext.Provider>
  )
}

export { MainProvider, MainContext };
