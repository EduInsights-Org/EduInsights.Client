import { Role } from "@utils/enums";
import { GPAClassMapping } from "@utils/types";

export const isIncludedRole = (a: Role[], b: Role[]): boolean => {
  return [...getCrossItems(a, b), ...getCrossItems(b, a)].length > 0;
};

function getCrossItems<Role>(a: Role[], b: Role[]): Role[] {
  return a.filter((element) => {
    return b.includes(element);
  });
}

export function capitalize(word: string): string {
  return word
    .replace(/_/g, " ")
    .split(" ")
    .map((w) => w.charAt(0).toUpperCase() + w.slice(1).toLowerCase())
    .join(" ");
}

export function getGPAClassInfo(gpa: number): GPAClassMapping {
  if (gpa >= 3.7 && gpa <= 4.0) {
    return { className: "First Class", color: "blue" };
  } else if (gpa >= 3.3 && gpa <= 3.69) {
    return { className: "Second Upper Class", color: "sky" };
  } else if (gpa >= 2.7 && gpa <= 3.29) {
    return { className: "Second Lower Class", color: "lime" };
  } else if (gpa >= 2.0 && gpa <= 2.69) {
    return { className: "Pass Class", color: "amber" };
  } else {
    return { className: "Fail", color: "red" };
  }
}
