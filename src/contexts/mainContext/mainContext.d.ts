type ContextState = {
  state: State
  dispatch: React.Dispatch<Action>
};

type Action =
 | { type: 'requestPeople' }
 | { type: 'requestPlanets' }
 | {
     type: 'updatePeople',
     people: Person[],
     nextPeople: string | null
     previousPeople: string | null
   }
 | {
     type: 'updatePlanets',
     planetsMap: Map<string, Planet>
   }
 | { type: 'planetsFinished' }
 | { type: 'failurePeople', error: string }
 | { type: 'failurePlanets', error: string }
 | { type: 'removePeopleError' }
 | { type: 'removePlanetsError' };


type State = {
  people: Person[]
  peopleLoading: boolean
  planetsLoading: boolean
  nextPeople: string | null
  peopleError: string | null,
  planetsError: string | null,
  previousPeople: string | null
  planetsMap: Map<string, Planet>
};

type MainProviderProps = {
  init?: State
  children: ReactNode
};
