export function convertMoney(money: number) {
  if (typeof money !== "number") return 0;
  return money.toLocaleString("pt-br", {
    minimumFractionDigits: 2,
    style: "currency",
    currency: "BRL",
  });
}
