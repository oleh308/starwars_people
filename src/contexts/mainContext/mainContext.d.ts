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
