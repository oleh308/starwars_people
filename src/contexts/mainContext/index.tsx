import React, {
  useReducer,
  createContext
} from 'react';

const reducerInit: State = {
  people: [],
  nextPeople: null,
  peopleLoading: false,
  previousPeople: null,
  planetsMap: new Map(),
  planetsLoading: false
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
        peopleLoading: false,
        people: action.people,
        nextPeople: action.nextPeople,
        previousPeople: action.previousPeople
      }

    case 'requestPeople':
      return {
        ...state,
        nextPeople: null,
        peopleLoading: true,
        previousPeople: null,
      }

    case 'updatePlanets':
      return {
        ...state,
        planetsMap: new Map(action.planetsMap)
      }

    case 'requestPlanets':
      return {
        ...state,
        planetsLoading: true
      }

    case 'planetsFinished':
      return {
        ...state,
        planetsLoading: false
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
