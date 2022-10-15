import React, { FC, useEffect, useState } from 'react'
import ITodo from 'models/ITodo'
import TodoItem from './TodoItem'

const Todo: FC = () => {
	const [name, setName] = useState<string>('')
	const [isValidName, setIsValidName] = useState<boolean>(false)
	const [errorMessage, setErrorMessage] = useState<string>('')
	const [todos, setTodos] = useState<ITodo[]>(() => {
		const savedTodos = localStorage.getItem('todos')
		const initialValue = savedTodos ? JSON.parse(savedTodos) : null
		return initialValue || []
	})

	const onKeyPressNameHandler = (e: React.KeyboardEvent<HTMLInputElement>) => {
		if (e.key !== 'Enter') return

		if (name.length <= 1 || name.length >= 20) {
			setErrorMessage('Название должно быть больше 1 и меньше 21 символа')
			setIsValidName(false)
			return
		}

		setIsValidName(true)
		setTodos(state => [
			...state,
			{
				_id: state.length > 0 ? state[state.length - 1]._id + 1 : 0,
				name: name,
				timeOut: new Date().toString(),
				isCompleted: false,
			},
		])
		setName('')
	}

	const changeComplitedTodo = (index: number) => {
		const newArray: ITodo[] = Object.assign([], todos)
		newArray[index].isCompleted = !newArray[index].isCompleted

		setTodos(newArray)
	}

	const deleteTodo = (id: number) => {
		setTodos(state => state.filter(todo => todo._id !== id))
	}

	useEffect(() => {
		localStorage.setItem('todos', JSON.stringify(todos))
	}, [todos])

	return (
		<div className="w-1/3 mx-auto px-2 flex flex-col justify-center items-center min-h-screen">
			<h2 className="text-4xl font-semibold uppercase mb-10 font-mono">
				Tasksik
			</h2>
			<div className="w-full py-1 max-h-52 overflow-x-scroll flex flex-col gap-3">
				{todos && todos.length > 0 ? (
					todos.map((todo, index) => (
						<TodoItem
							key={todo._id}
							{...todo}
							index={index}
							changeComplitedTodo={changeComplitedTodo}
							deleteTodo={deleteTodo}
						/>
					))
				) : (
					<p className="text-center text-gray-500 text-xl font-mono">
						You don't have tasks
					</p>
				)}
			</div>
			<input
				className="w-3/4 text-md py-4 mt-6 px-8 outline-none rounded-full shadow font-mono"
				type="text"
				value={name}
				onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
					setName(e.target.value)
				}
				onKeyPress={onKeyPressNameHandler}
				placeholder="Enter a new task"
			/>
			{!isValidName ? (
				<span className="mt-3 text-red-400">{errorMessage}</span>
			) : (
				''
			)}
		</div>
	)
}

export default Todo
