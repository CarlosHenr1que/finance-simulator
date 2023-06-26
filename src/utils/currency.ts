export const formatCurrency = (value: number | undefined) => {
  if (!value) {
    return;
  }
  return `R$ ${Number(String(value).replace(",", "."))
    .toFixed(2)
    .replace(".", ",")}`;
};
