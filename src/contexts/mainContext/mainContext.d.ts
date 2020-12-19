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
 | { type: 'failure', error: string };

type State = {
  people: Person[]
  peopleLoading: boolean
  planetsLoading: boolean
  nextPeople: string | null
  previousPeople: string | null
  planetsMap: Map<string, Planet>
};

type MainProviderProps = {
  children: ReactNode
};
