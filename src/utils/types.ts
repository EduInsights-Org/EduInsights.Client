import { ReactElement } from "react";

export interface ITab {
  id: string;
  label: string;
  content: JSX.Element;
  action: ReactElement;
}
