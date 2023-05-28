// creating a custom version of context
// creating a template literal

import React from 'react';

export const createContext = <T extends {}>() => {
  const Context = React.createContext<T | undefined>(undefined);

  const useContext = () => {
    const ctx = React.useContext(Context);
    if (ctx === undefined) {
      throw new Error(
        `useContext must be inside a Provider and a value must be provided`,
      );
    }
    // now context will definitely give use T
    return ctx;
  };

  return [useContext, Context.Provider] as const;
};
