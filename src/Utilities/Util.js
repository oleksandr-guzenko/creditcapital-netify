// export const getAddress = (address) => {
//   const add1 = address.substring(0, 2)
//   const add2 = address.substring(address.length - 4)
//   const finalAdd = `${add1}....${add2}`
//   return finalAdd
// }
export const numberFormate = (number) => {
  return Number(number)?.toLocaleString(navigator.language, {
    minimumFractionDigits: 2,
  })
}

export const formateDate = (milliSeconds) => {
  const newDate = new Date(milliSeconds * 1000)
  const [years, months, days, hours, minutes, seconds] = [
    newDate.getFullYear(),
    newDate.getMonth() + 1,
    newDate.getDate(),
    newDate.getHours(),
    newDate.getMinutes(),
    newDate.getSeconds(),
  ]
  return [years, months, days, hours, minutes, seconds]
}

export const calculatePercentage = (totalAmount, percentage) => {
  const percentageAmount = (Number(percentage) / 100) * Number(totalAmount)
  const result = Number(totalAmount) - percentageAmount
  return result
}
