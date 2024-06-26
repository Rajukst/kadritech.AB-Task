
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import './App.css'
import Tasks from './Components/Tasks'
import AddTask from './Components/AddTask'
import Edit from './Components/Edit'

function App() {
  return(
    <BrowserRouter>
    <Routes>
      <Route path='/' Component={Tasks}/>
      <Route path='/add' Component={AddTask}/>
      <Route path='/edit/:taskId' Component={Edit}/>
    </Routes>
    </BrowserRouter>
  )
}

export default App
