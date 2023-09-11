import React, { useState } from 'react'

function Card(props) {
const [isHovered,setIsHovered]=useState(false)

  return (
    <div className='relative m-2 '  draggable onDrag={props.dragStart} onDragEnter={props.dragEnter} onDragEnd={props.dragEnd}>  
<div href="/" className="block max-w-sm p-6 bg-white border border-gray-200 rounded-lg shadow hover:bg-gray-100 dark:bg-gray-800 dark:border-gray-700 dark:hover:bg-gray-700"
onMouseEnter={()=>setIsHovered(true)}
onMouseLeave={()=>setIsHovered(false)}
>

  <div className='flex px-2 '>
    <h5  className="mb-2 text-2xl font-bold relative overflow-hidden  text-wrap tracking-tight text-gray-900 dark:text-white">{props.title}</h5>
    <div className="absolute right-0 top-0 h-16 w-16">
    <div
      classame="absolute transform rounded-full rotate-45 bg-green-600 text-center text-white font-semibold py-1 right-[-25px] top-[20px] w-[120px]">
      {props.status.toUpperCase()}
    </div>
  </div>
    </div>
     
     
    <h1 className='font-bold text-white'>Description</h1>
    
    <p  className="font-normal my-2 text-white">{props.description}</p>

    
   

    <button type="button" className="focus:outline-none text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-900" onClick={props.handleDelete}>Delete</button>  
    <button type="button" className="focus:outline-none text-white bg-green-700 hover:bg-green-800 focus:ring-4 focus:ring-green-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800" onClick={props.handleEdit}>Edit</button>

</div>

    </div>

  )
}

export default Card
