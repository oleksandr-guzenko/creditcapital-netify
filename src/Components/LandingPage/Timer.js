import React, {useEffect, useState} from 'react'
import intervalToDuration from 'date-fns/intervalToDuration'

// redux imports

const SaleTimer = ({countDownTime, setEnableClaim}) => {
  const [timer, setTimer] = useState('')

  useEffect(() => {
    if (countDownTime?.length > 0) {
      const info = setInterval(() => {
        const results = intervalToDuration({
          start: new Date(),
          //   end: new Date(
          //     countDownTime[0],
          //     countDownTime[1],
          //     countDownTime[2],
          //     countDownTime[3],
          //     countDownTime[4],
          //     countDownTime[5]
          //   ),
          end: new Date(2021, 9, 13, 14, 7, 55),
        })
        if (
          results.years === 0 &&
          results.days === 0 &&
          results.hours === 0 &&
          results.minutes === 0 &&
          results.seconds === 0
        ) {
          setTimer(results)
          clearInterval(info)
          setEnableClaim(true)
        } else {
          setTimer(results)
        }
      }, 1000)
    }
  }, [countDownTime])

  return (
    <p className='saleTimer d-flex align-items-center justify-content-center'>
      {timer?.days}D : {timer?.hours}H : {timer?.minutes}M : {timer?.seconds}S
      {/* <div className='time__wrapper'>
        <h3 className='txt__brand'>{timer?.days}</h3>
        <p className='txt__brand'>Days</p>
      </div>

      <div className='time__wrapper'>
        <h3 className='txt__brand'>{timer?.hours}</h3>
        <p className='txt__brand'>Hours</p>
      </div>

      <div className='time__wrapper'>
        <h3 className='txt__brand'>{timer?.minutes}</h3>
        <p className='txt__brand'>Minutes</p>
      </div>
      <div className='time__wrapper'>
        <h3 className='txt__brand'>{timer?.seconds}</h3>
        <p className='txt__brand'>Seconds</p>
      </div> */}
    </p>
  )
}

export default SaleTimer
