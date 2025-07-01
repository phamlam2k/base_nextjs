import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function sortByField<T>(
  array: T[],
  field: keyof T,
  order: "asc" | "desc" = "asc"
): T[] {
  return array.sort((a, b) => {
    const valA = a[field];
    const valB = b[field];

    const getComparableValue = (val: unknown) => {
      if (val instanceof Date) return val.getTime();
      return val;
    };

    const compA = getComparableValue(valA);
    const compB = getComparableValue(valB);

    if (typeof compA === "string" && typeof compB === "string") {
      return order === "asc"
        ? compA.localeCompare(compB)
        : compB.localeCompare(compA);
    }

    if (typeof compA === "number" && typeof compB === "number") {
      return order === "asc" ? compA - compB : compB - compA;
    }

    return order === "asc"
      ? String(compA).localeCompare(String(compB))
      : String(compB).localeCompare(String(compA));
  });
}
