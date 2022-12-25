// Format the price above to USD using the locale, style, and currency.
const formatEuroBuilder = new Intl.NumberFormat("pt-PT", {
  style: "currency",
  currency: "EUR",
});

const formatNumberBuilder = new Intl.NumberFormat("pt-PT", {});

export const formatEuro = formatEuroBuilder.format;
export const formatNumber = formatNumberBuilder.format;
