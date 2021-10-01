// export const getAddress = (address) => {
//   const add1 = address.substring(0, 2)
//   const add2 = address.substring(address.length - 4)
//   const finalAdd = `${add1}....${add2}`
//   return finalAdd
// }

export const numberFormate = (number) => {
  return Number(number)?.toLocaleString(navigator.language, {
    minimumFractionDigits: 4,
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

export const priceConversion = (type, formate, amount, web3) => {
  if (type === 'fromWei') {
    const price = web3.utils.fromWei(amount.toString(), formate)
    return price
  }
  if (type === 'toWei') {
    const price = web3.utils.toWei(amount.toString(), formate)
    return price
  }
}

export const gasPrice = async (web3, number) => {
  const gasPrice = await web3.eth.getGasPrice()
  if (number) {
    const newGasPrice = web3.utils.toHex(Number(gasPrice * number)?.toFixed(0))
    return newGasPrice
  } else {
    const newGasPrice = web3.utils.toHex(Number(gasPrice * 4.5)?.toFixed(0))
    return newGasPrice
  }
}
