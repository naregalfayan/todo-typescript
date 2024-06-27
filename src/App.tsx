import { useEffect, useReducer } from 'react'
import './App.css'
import { ToDoList } from './components/ToDoList'
import { reducer } from './lib/reducer'
import { initialState } from './lib/initialState'
import { getAll} from './lib/api'
import { TodoContext } from './lib/context'
import { ActionTypes } from './lib/types'


function App() {

  const [state, dispatch]= useReducer(reducer, initialState)
  useEffect(()=>{
    getAll()
    .then (res=>{
      dispatch({type:ActionTypes.setTodos, payload:res})
    })
  },[])

  return (
    <>
    <TodoContext.Provider value={{state, dispatch}}>
      <ToDoList
      />
      </TodoContext.Provider>
      
    </>)
}

export default App
