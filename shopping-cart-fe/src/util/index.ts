
export function centsToDollars(cents: any) {
  const dollars = cents / 100;
  return dollars.toLocaleString('en-US', {style: 'currency', currency: 'USD'});
}