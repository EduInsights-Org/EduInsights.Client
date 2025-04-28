import { ReactElement } from "react";
import { GPAClass, GPAColor } from "./enums";

export interface ITab {
  id: string;
  label: string;
  content: JSX.Element;
  action: ReactElement;
}

export interface GPAClassMapping {
  className: GPAClass;
  color: GPAColor;
}
