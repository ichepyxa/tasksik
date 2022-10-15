import React, { FC } from 'react'
import 'models/ITodo'
import ITodo from 'models/ITodo'

interface ITodoItem extends ITodo {
	index: number
	changeComplitedTodo: CallableFunction
	deleteTodo: CallableFunction
}

const TodoItem: FC<ITodoItem> = ({
	_id,
	name,
	index,
	timeOut,
	isCompleted,
	changeComplitedTodo,
	deleteTodo,
}) => {
	return (
		<div className="py-3 px-5 bg-white rounded-2xl min-w-full flex justify-between items-center shadow">
			<div className="flex gap-3 items-center">
				<input
					type="checkbox"
					className="cursor-pointer border-2 rounded-lg w-6 h-6 appearance-none checked:bg-blue-400 font-mono"
					checked={isCompleted}
					onChange={() => changeComplitedTodo(index)}
				/>
				<span
					className={`m-0 p-0 text-lg cursor-pointer font-mono ${
						isCompleted ? 'line-through' : ''
					}`}
					onClick={() => changeComplitedTodo(index)}
				>
					{name}
				</span>
			</div>
			<div className="flex gap-4">
				<span className="font-mono">
					{new Date(timeOut).toLocaleDateString()}
				</span>
				<svg
					onClick={() => deleteTodo(_id)}
					xmlns="http://www.w3.org/2000/svg"
					className="text-red-500 cursor-pointer"
					width="24"
					height="24"
					viewBox="0 0 24 24"
					strokeWidth="2"
					stroke="currentColor"
					fill="none"
					strokeLinecap="round"
					strokeLinejoin="round"
				>
					<path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
					<line x1="4" y1="7" x2="20" y2="7"></line>
					<line x1="10" y1="11" x2="10" y2="17"></line>
					<line x1="14" y1="11" x2="14" y2="17"></line>
					<path d="M5 7l1 12a2 2 0 0 0 2 2h8a2 2 0 0 0 2 -2l1 -12"></path>
					<path d="M9 7v-3a1 1 0 0 1 1 -1h4a1 1 0 0 1 1 1v3"></path>
				</svg>
			</div>
		</div>
	)
}

export default TodoItem
