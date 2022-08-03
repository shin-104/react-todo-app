import { useEffect, useContext } from 'react'
import { client } from '../libs/axios'
import { TodoContext } from '../provider/TodoProvider'

const omitText = (text: string): string => {
  // if (text.length > 10) {
  //   return text.substring(0, 7) + '...'
  // }
  return text
}

export const TodoList = () => {
  const { todos, setTodos } = useContext(TodoContext)

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

        changeTodo(todo.id.toString(),todo.content,todo.status.toString())
      }
    })
  }

  const changeTodo = async (id: string, content: string, status: string) => {
    console.log(status)
    const body = new URLSearchParams({
      id,content,status
    })
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
      <p className="font-bold mb-2">タスク一覧</p>
      <table className="border-collapse table-auto">
        <thead>
          <tr>
            <th className="py-1">番号</th>
            <th className="p-1">タスク名</th>
            <th className="p-1">ステータス</th>
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
                <td className="p-1"><input type="text" disabled={todo.status} value={omitText(todo.content)}></input></td>
                <td><input type="checkbox" checked={todo.status} readOnly onChange={(e)=>handleCheked(todo.id,todo.status)}/>完了</td>
                <td className="p-1">
                  <button
                    className="px-2 h-7 border border-white rounded bg-teal-400 shadow-md text-white"
                    onClick={() => {
                      changeTodo(todo.id.toString(), todo.content,todo.status.toString())
                    }}
                  >
                    保存
                  </button>
                </td>
                <td className="p-1">
                  <button
                    className="px-2 h-7 border border-white rounded bg-teal-400 shadow-md text-white"
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