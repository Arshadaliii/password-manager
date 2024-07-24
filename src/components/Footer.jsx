import React from 'react'

const footer = () => {
    return (
        <div className='bg-slate-800 flex text-white flex-col justify-center items-center '>
            <div className="logo font-bold text-white text-2xl">
                <span className="text-green-500">  &lt;</span>
                Pass
                <span className="text-green-500">op/ &gt;</span>
            </div>
            <div className='flex justify-center items-center'>
                Created with <img className='w-10 mx-2' src="icons/hear.svg" alt="hear" /> by Arshad Ali
            </div>
        </div>
    )
}

export default footer
