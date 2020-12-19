import React, {
  useReducer,
  createContext
} from 'react';

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
