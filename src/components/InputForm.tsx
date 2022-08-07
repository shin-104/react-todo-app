import { useState, useContext, useRef } from 'react'
import { client } from '../libs/axios'
import { TodoContext } from '../provider/TodoProvider'

export const InputForm = () => {
  const [todoName, setTodoName] = useState('')
  const { setTodos } = useContext(TodoContext)
  const onChangeTodoName: React.ChangeEventHandler<HTMLInputElement> = (
    event
  ) => {
    setTodoName(event.target.value)
  }

  const addTodo = async () => {
    if (todoName === '') {
      return
    }

    const todo = {
      content: todoName,
      status: 'false',
    }

    setTodoName('')
    const body = new URLSearchParams(todo)
    await client.post('todo', body)
    client.get('todo').then(({ data }) => {
      console.log(data)
      setTodos(data)
    })
    location.href = "/"
  }

  return (
    <div className="w-auto h-30 mb-4 p-4 border border-gray-200 rounded shadow-lg">
      <p className="mb-8 font-bold">追加するToDoを入力してください</p>
      <input
        placeholder="新規Todoを追加"
        className="mr-4 border shadow-md border-blue-500 rounded"
        onChange={onChangeTodoName}
        value={todoName}
      />
      <button
        onClick={addTodo}
        className="px-2 h-7 border border-white rounded bg-blue-400 shadow-md text-white"
      >
        追加
      </button>
    </div>
  )
}
