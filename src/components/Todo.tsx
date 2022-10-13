import React, { FC, useState } from 'react'
import ITodo from 'models/ITodo'
import TodoItem from './TodoItem'

const Todo: FC = () => {
	const [name, setName] = useState<string>('')
	const [isValidName, setIsValidName] = useState<boolean>(false)
	const [errorMessage, setErrorMessage] = useState<string>('')
	const [todos, setTodos] = useState<ITodo[]>([
		{
			_id: 0,
			name: 'Не ехать на конкурс',
			isCompleted: true,
			timeOut: new Date().toString(),
		},
	])

	const onKeyPressNameHandler = (e: React.KeyboardEvent<HTMLInputElement>) => {
		if (e.key !== 'Enter') return

		if (name.length <= 1) {
			setErrorMessage('Название должно быть больше 1 символа')
			setIsValidName(false)
			return
		}

		setIsValidName(true)
		setTodos(state => [
			...state,
			{
				_id: todos.length,
				name: name,
				timeOut: new Date().toString(),
				isCompleted: false,
			},
		])
		setName('')
	}

	return (
		<div className="w-1/3 mx-auto px-2 flex flex-col justify-center items-center min-h-screen">
			<h2 className="text-4xl font-semibold uppercase mb-10">Tasksik</h2>
			<div className="w-full py-1 max-h-52 overflow-x-scroll flex flex-col gap-3">
				{todos.map(todo => (
					<TodoItem key={todo._id} {...todo} />
				))}
			</div>
			<input
				className="w-3/4 text-md py-4 mt-6 px-8 outline-none rounded-full shadow"
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
