export function formatDateToDDMMMYYYY(date: string): string {
  const dateObj = new Date(date);

  return dateObj.toLocaleDateString("en-GB", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  });
}
