export const generateCustomerCode = (id: number) => {
  return `CUS-${String(id).padStart(5, "0")}`;
};
