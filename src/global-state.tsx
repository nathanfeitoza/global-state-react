import { createContext, useContext, useState, useCallback } from "react";

let instance = null;

export default class GlobalState {
  private globalStateData = null;

  constructor({ state, mutations, actions }) {
    if (!instance) {
      instance = this;

      this.globalStateData = this.createState({
        state,
        mutations,
        actions,
      });
    }

    return instance;
  }

  init() {
    return this.globalStateData;
  }

  private createState({ state, mutations, actions }) {
    const stateContextDefaultValues = {
      state: state || {},
      mutations: mutations || {},
      actions: actions || {},
    };

    const StateContext = createContext(stateContextDefaultValues);

    function useStateContext() {
      return useContext(StateContext);
    }

    function StateProvider({ children }) {
      const [stateData, setCommit] = useState(stateContextDefaultValues.state);
      const [, updateState] = useState();
      const forceUpdate = useCallback(() => updateState({}), []);

      const mutation = (mutationExec, data) => {
        if (
          typeof stateContextDefaultValues.mutations[mutationExec] ===
          "function"
        ) {
          stateContextDefaultValues.mutations[mutationExec](stateData, data);

          setCommit(stateData);
          forceUpdate();
        }
      };

      const dispatch = (actionExec, data) => {
        if (
          typeof stateContextDefaultValues.actions[actionExec] === "function"
        ) {
          const context = {
            commit: mutation,
          };
          stateContextDefaultValues.actions[actionExec](context, data);
        }
      };

      const value = {
        state,
        mutation,
        dispatch,
      };

      return (
        <>
          <StateContext.Provider value={value}>
            {children}
          </StateContext.Provider>
        </>
      );
    }

    return { Provider: StateProvider, StateContext: useStateContext };
  }
}
