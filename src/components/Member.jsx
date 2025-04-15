import React from 'react'

function Member(props) {
  return (
   <>
   <div className='border-[1px] border-red-200 rounded-2xl p-4 shadow-2xl'>
    <h3 className='font-bold text-3xl text-left'>{props.name}</h3>
    <h4 className="font-semibold text-xl text-left">{props.occupation}</h4>
    <p className="text-black text-left mt-3 text-base leading-relaxed max-w-2xl">
 {props.intro}
</p>
<a  className='mt-2 underline text-blue-600' href={props.link}>{props.linkText}</a>

   </div>
   </>
  )
}

export default Member