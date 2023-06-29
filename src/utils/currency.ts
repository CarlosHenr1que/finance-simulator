export const formatCurrency = (value: number | undefined) => {
  if (!value && value !== 0) {
    return;
  }
  const priceStr: string = value.toFixed(2);
  const [integerPart, decimalPart] = priceStr.split(".");
  let formattedInteger = "";
  for (let i = integerPart.length - 1, count = 0; i >= 0; i--, count++) {
    formattedInteger = integerPart[i] + formattedInteger;
    if (count % 3 === 2 && i !== 0) {
      formattedInteger = "." + formattedInteger;
    }
  }
  const formattedPrice = `R$ ${formattedInteger},${decimalPart}`;

  return formattedPrice;
};
