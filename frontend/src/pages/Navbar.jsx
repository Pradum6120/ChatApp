import React from 'react'

function Navbar() {
  return (
    <div className=' min-w-screen  w-screen bg-blue-700 h-[60px]  p-8 flex justify-between gap-6 items-center '>
        <div className='flex flex-col justify-center'>
             <h1 className='text-xl text-orange-500 font-mono'>Hii,Pradum</h1>
             </div>
      <div className='w-12 h-12 bg-red-700 rounded-full mr-12'>
            <img className='w-[100%] h-[100%] rounded-full' src="https://avatar.iran.liara.run/public/girl" alt="" />
            </div>
             
    </div>
  )
}

export default Navbar
