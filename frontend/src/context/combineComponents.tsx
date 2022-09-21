import React, { ComponentProps, FC, ReactNode } from "react";
interface Props {
  children: ReactNode;
  elementType?: string;
}
export const combineComponents = (...components: FC[]): FC => {
  return components.reduce(
    (AccumulatedComponents: any, CurrentComponent: any) => {
      return ({ children }: any): JSX.Element => {
        return (
          <AccumulatedComponents>
            <CurrentComponent>{children}</CurrentComponent>
          </AccumulatedComponents>
        );
      };
    },
    ({ children }) => <>{children}</>
  );
};
