import React, { useEffect, useState,useRef } from 'react'
import Card from './Card'

function TodoList() {

const [data,setData]=useState([])
const [completedToDo,setCompletedToDo]=useState([])
const [doing,setDoing]=useState([])
const [loading,setLoading]=useState(true)
const pickedElement=useRef("")
const pickedDiv=useRef("")



const fetchData=async ()=>{
  const response=await fetch("https://todo-backend-1la2.onrender.com/api/alltodos")
  if(response.ok){
    const result=await response.json()

    const todoArray=await result.filter((elem)=>elem.status=='todo');
    const completedArray= await result.filter((elem)=>elem.status=='done');
    const doingArray= await result.filter((elem)=>elem.status=='doing');

   setData(todoArray);
   setCompletedToDo(completedArray);
   setDoing(doingArray)
   console.log("doing",doing)
   setLoading(false)
  }
  if(!response.ok){
    const error=await response.json;
    console.log("error",error)
    setLoading(false)
  }
}

const deleteData=async (id)=>{
  const deleteData={_id:id}
  const data = await fetch("https://todo-backend-1la2.onrender.com/api/deletetodo",{
    method:"DELETE",
    body:JSON.stringify(deleteData),
    headers:{
      "Content-Type":"application/json"
    }
  })
  if(data.ok){
    fetchData()
  }
  if(!data.ok){
    console.log("error")
  }
}





const handleDragEnd=(e)=>{

console.log("pickedElement",pickedElement.current)

const tododiv = document.getElementById("todo");

const doingdiv=document.getElementById("doing");

tododiv.appendChild(e.target)

doingdiv.appendChild(e.target)

}



const handleMouseOver=(e)=>{

  console.log(e.target.id)

}

useEffect(()=>{
fetchData()
console.log(data)
},[])
  return (

    <div className='flex xl:flex-row flex-col md:flex-row  justify-around m-auto'>
<div id="todo" className='min-w-[30vw] mx-2 my-1 bg-blue-200 rounded-lg items-stretch  p-2' onDragEndCapture={(e)=>handleDragEnd(e)}  >
<p className='text-3xl p-2 font-bold m-auto'>Todo</p>
  {
    loading ?"loading":
      data.map((elem)=><Card
      title={elem.todoName}
      key={elem._id}
      description={elem.description}
      status={elem.status}
      dragStart={() => pickedElement.current = elem}
      handleDelete={() => deleteData(elem._id)}
      onDragEnd={()=>handleDragEnd(e) }
      />)
}
</div>


<div className='min-w-[30vw] mx-2 my-1 bg-blue-200 rounded-lg  justify-center p-2 ' onDragEndCapture={(e)=>handleDragEnd(e)}>

  <p className='text-3xl p-2 font-bold m-auto'>Done</p>

{
        loading ?"loading":
          completedToDo.map((elem, index) => <Card
          value={index}
          key={elem._id}
          title={elem.todoName}
          status={elem.status}
          description={elem.description}
          dragStart={() => pickedElement.current = elem}
          handleDelete={()=>deleteData(elem._id)}
          />)
}
</div>  


<div id='doing' className='min-w-[30vw] mx-2 my-1 bg-blue-200 rounded-lg item-center justify-center p-2' onDragEndCapture={(e)=>handleDragEnd(e)}>

<p className='text-3xl p-2 font-bold m-auto'>Doing</p>
{
        loading?"loading":
         doing.map((elem) => <Card
          key={elem._id}
          title={elem.todoName}
          status={elem.status}
          description={elem.description}
          dragStart={() => pickedElement.current = elem}
          onDragEnd={()=> pickedElement.current=null}
          handleDelete={()=>deleteData(elem._id)}
          />)
} 
</div> 


</div>
  )
}

export default TodoList
