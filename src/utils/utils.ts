import { Role } from "./types";

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
    .replace(/_/g, " ") // Replace underscores with spaces
    .split(" ") // Split the sentence into words
    .map((w) => w.charAt(0).toUpperCase() + w.slice(1).toLowerCase()) // Capitalize each word
    .join(" ");
}
