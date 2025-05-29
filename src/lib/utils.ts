import { twMerge } from "tailwind-merge";
import { type ClassValue, clsx } from "clsx";
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}
export function generateInitials(fullName: string): string {
  const nameParts = fullName.trim().split(" ");
  const initials = nameParts.map((part) => part[0].toUpperCase()).join("");
  return initials;
}