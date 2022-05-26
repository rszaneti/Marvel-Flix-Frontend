export const { format: formatPrice } = new Intl.NumberFormat('pt-BR', {
  style: 'currency',
  currency: 'BRL',
});

export const { format: formatPriceWithoutCur } = new Intl.NumberFormat(
  'pt-BR',
  {
    minimumFractionDigits: 2,
  },
);
