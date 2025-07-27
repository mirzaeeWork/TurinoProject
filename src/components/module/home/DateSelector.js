import { MdOutlineDateRange } from 'react-icons/md'
import SolarDatePicker from '@/components/element/DatePicker'

function DateSelector ({ value, onChange, placeHolder, className = '', 
  isFutureOnly = false,onBlur = () => {}, topOffsetClass = "top-default" ,classNameDP=""  }) {
  return (
    <>
      <div
        className={`${className}`}
      >
        <div className='sm:w-[10%] ml-[8px]'>
          <MdOutlineDateRange />
        </div>
        <SolarDatePicker
          value={value}
          onChange={onChange}
          placeHolder={placeHolder}
          isFutureOnly={isFutureOnly}
          onBlur={onBlur}
          topOffsetClass={topOffsetClass}
          classNameDP={classNameDP}
        />
      </div>

     </>
  )
}

export default DateSelector
