import './App.css'
import './index.css'
import Navbar from './components/navbar'
import TodoMaker from './components/TodoMaker'

function App() {

  return (
    <>
      <div className='min-h-screen'>
        <Navbar/>
         <TodoMaker/>
      </div>
     
    </>
  )
}

export default App
