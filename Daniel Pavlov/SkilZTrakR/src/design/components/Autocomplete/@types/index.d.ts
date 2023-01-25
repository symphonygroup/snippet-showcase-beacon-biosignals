import { ReactNode } from "react";
import { GroupBase, OptionsOrGroups } from "react-select";

declare module "react-select/dist/declarations/src/Select" {
  //eslint-disable-next-line @typescript-eslint/consistent-type-definitions
  export interface Props {
    numOfLabels?: number;
    multiLabelIcon?: ReactNode;
    isInvalid?: boolean;
    loadOptions?: (
      inputValue: string,
      cbFunction: (
        options: OptionsOrGroups<unknown, GroupBase<unknown>>,
      ) => void,
    ) => void;
  }
}
