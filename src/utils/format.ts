export const formatNumber = (
  value: any,
  digits: number = 2,
  currency: boolean,
  whenInvalid: string | undefined = undefined
) =>
  Number.isNaN(value) || !Number.isFinite(value)
    ? whenInvalid
    : Intl.NumberFormat("en-US", {
        style: currency ? "currency" : "decimal",
        minimumFractionDigits: digits,
        maximumFractionDigits: digits,
      }).format(value);
