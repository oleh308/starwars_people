import React, {
  useReducer,
  createContext
} from 'react';

const reducerInit: State = {
  people: [],
  nextPeople: null,
  peopleError: null,
  planetsError: null,
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
        peopleError: null,
        peopleLoading: true,
        previousPeople: null,
      }

    case 'failurePeople':
      return {
        ...state,
        peopleLoading: false,
        peopleError: action.error
      }

    case 'updatePlanets':
      return {
        ...state,
        planetsMap: new Map(action.planetsMap)
      }

    case 'requestPlanets':
      return {
        ...state,
        planetsError: null,
        planetsLoading: true
      }

    case 'planetsFinished':
      return {
        ...state,
        planetsLoading: false
      }

    case 'failurePlanets':
      return {
        ...state,
        planetsLoading: false,
        planetsError: action.error
      }

    case 'removePeopleError':
      return {
        ...state,
        peopleError: null
      }

    case 'removePlanetsError':
      return {
        ...state,
        planetsError: null
      }
  }

  return state;
}

function MainProvider({ children, init }: MainProviderProps) {
  const [state, dispatch] = useReducer(mainReducer, init ? init : reducerInit);

  return (
    <MainContext.Provider value={{ state, dispatch }}>
      { children }
    </MainContext.Provider>
  )
}

export { MainProvider, MainContext, reducerInit };
