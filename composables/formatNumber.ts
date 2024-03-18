export default function (value: number | bigint | undefined) {
  if(value == undefined) value = 0
  return new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
    minimumFractionDigits: 2,
  }).format(value);
}
