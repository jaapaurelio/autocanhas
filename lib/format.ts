// Format the price above to USD using the locale, style, and currency.
const formatEuroBuilder = new Intl.NumberFormat("pt-PT", {
  style: "currency",
  currency: "EUR",
});

const formatNumberBuilder = new Intl.NumberFormat("pt-PT", {});

export const formatEuro = function (price: number) {
  if (!price) {
    return "Sob Consulta";
  }

  return formatEuroBuilder.format(price);
};
export const formatNumber = formatNumberBuilder.format;
