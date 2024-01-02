// 入力フォーム
import React, { useState, useEffect } from "react";
import { createTodo } from "../lib/api/todos"
import { Todo } from "../interfaces/index"

interface TodoFormProps {
  todos: Todo[]
  setTodos: Function
}

export const TodoForm: React.FC<TodoFormProps> = ({ todos, setTodos }) => {
  // title は現在のTodoのタイトルを表し、setTitle は title の更新関、初期値として空の文字列を指定
  const [title, setTitle] = useState<string>("")
  // 新しいTodoを作成するための関数
  // フォームのデフォルトの送信動作がキャンセル
  const handleCreateTodo = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    const data: Todo = {
      title: title
    }
    
    try {
      const res = await createTodo(data)
      console.log(res)

      if (res.status == 200) {
        setTodos([...todos, res.data.todo])
      } else {
        console.log(res.data.message)
      }
    } catch (err) {
      console.log(err)
    }

    setTitle("")
  }
  
  return (
    <form onSubmit={handleCreateTodo}>
      <input
        type="text"
        value={title}
        onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
          setTitle(e.target.value)
        }}
      />
      <input type="submit" value="Add" disabled={!title} />
    </form>
  )
}