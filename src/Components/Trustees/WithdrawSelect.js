import React from 'react'
import Select, {components} from 'react-select'
import {BsFillPlayFill} from 'react-icons/bs'

const WithdrawSelect = ({optionValue, setOptionValue, options}) => {
  const handleChange = (selectedOption) => {
    setOptionValue(selectedOption)
  }
  const CaretDownIcon = () => {
    return <BsFillPlayFill className='play-down' />
  }
  const DropdownIndicator = (props) => {
    return (
      <components.DropdownIndicator {...props}>
        <CaretDownIcon />
      </components.DropdownIndicator>
    )
  }

  return (
    <Select
      placeholder={'Action'}
      components={{DropdownIndicator}}
      onChange={handleChange}
      options={options}
      isSearchable={false}
      // value={options.filter((option) => {
      //   const res = option.value === optionValue
      //   return res.value
      // })}
      value={optionValue.value}
    />
  )
}

export default WithdrawSelect

// import React from 'react'
// import Select, {components} from 'react-select'
// import {BsFillPlayFill} from 'react-icons/bs'

// const GlobalFilter = ({filter, setFilter, options, label}) => {
//   const handleChange = (selectedOption) => {
//     setFilter(selectedOption.value)
//   }

//   const CaretDownIcon = () => {
//     return <BsFillPlayFill className='play-down' />
//   }

//   const DropdownIndicator = (props) => {
//     return (
//       <components.DropdownIndicator {...props}>
//         <CaretDownIcon />
//       </components.DropdownIndicator>
//     )
//   }

//   return (
//     <div className='select__wrapper'>
//       <label htmlFor='select' className='select__label'>
//         {label}
//       </label>
//       <Select
//         placeholder={'All'}
//         components={{DropdownIndicator}}
//         value={filter}
//         onChange={handleChange}
//         options={options}
//         isSearchable={false}
//         value={options.filter((option) => {
//           return option.value === filter
//         })}
//       />
//     </div>
//   )
// }

// export default GlobalFilter
