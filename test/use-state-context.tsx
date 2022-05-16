import { StateContext } from "./create-state-manager";


export default function StateUse() {
  const { state, mutation } = StateContext();

  return (
    <>
      {state.books.map((book, index) => <div key={index}>{book}</div>)}
    </>
  );

}
