import { useEffect, useContext, useRef } from 'react'
import { client } from '../libs/axios'
import { TodoContext } from '../provider/TodoProvider'
import {SystemConst} from "../constants/index"

export const TodoList = () => {
  const { todos, setTodos } = useContext(TodoContext)
 const inputTodo = useRef<HTMLInputElement>(null)

  useEffect(() => {
    client.get('todo').then(({ data }) => {
      setTodos(data)
    })
  }, [])

  const handleCheked = (id:number, cheked:boolean) => {
    const newTodos = todos.map((todo) => {
      if (todo.id === id){
        todo.status = !cheked
        console.log(cheked)

        saveTodo(todo.id.toString(),todo.content,todo.status.toString())
      }
    })
  }

  const saveTodo = async (id: string, content: any, status: string) => {
    console.log(status)

    if (content === null || content === undefined) {
      console.log("タスクなし")
      return
    }
    const body = new URLSearchParams({
      id,content,status
    })
    console.log(`body:${body}`)
    await client.put(`todo/${id}`, body)
    client.get('todo').then(({ data }) => {
      setTodos(data)
    })
  }

  const deleteTodo = async (id: string) => {
    await client.delete(`todo/${id}`)
    client.get('todo').then(({ data }) => {
      setTodos(data)
    })
  }

  return (
    <div className="p-4 border border-gray-200 rounded shadow-lg">
      <p className="font-bold mb-8">タスク一覧</p>
      <table className="border-collapse table-auto">
        <thead>
          <tr>
            <th className="py-1">No</th>
            <th className="p-1">タスク名</th>
            <th className="p-1"></th>
            <th className="p-1"></th>
            <th className="p-1"></th>
          </tr>
        </thead>
        <tbody>
          {todos.map((todo, index) => {
            console.log(todo)
            return (
              <tr key={index}>
                <td className="p-1">{todo.id}</td>
                <td className="p-1"><input className='border shadow-md border-blue-500 rounded disabled:bg-gray-300 disabled:border-none' type="text" disabled={todo.status} defaultValue={todo.content} ref={inputTodo}></input></td>
                <td><input className='mr-2 mt-2' type="checkbox" checked={todo.status} readOnly onChange={(e)=>handleCheked(todo.id,todo.status)}/>{SystemConst.DONE}</td>
                <td className="p-1">
                  <button
                    className="ml-4 px-2 h-7 border border-white rounded bg-blue-400 shadow-md text-white disabled:bg-gray-300"
                    disabled={todo.status} 
                    onClick={() => {
                      saveTodo(todo.id.toString(), inputTodo.current?.value,todo.status.toString())
                    }}
                  >
                    保存
                  </button>
                </td>
                <td className="p-1">
                  <button
                    className="px-2 h-7 border border-white rounded bg-red-400 shadow-md text-white"
                    onClick={() => {
                      deleteTodo(todo.id.toString())
                    }}
                  >
                    削除する
                  </button>
                </td>
              </tr>
            )
          })}
        </tbody>
      </table>
    </div>
  )
}