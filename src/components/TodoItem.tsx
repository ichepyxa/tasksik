import React, { FC } from 'react'
import 'models/ITodo'
import ITodo from 'models/ITodo'

const TodoItem: FC<ITodo> = ({ _id, name, timeOut, isCompleted }) => {
	const formatDate = new Date(timeOut)

	return (
		<div className="py-3 px-5 bg-white rounded-2xl min-w-full flex justify-between items-center shadow">
			<div className="flex gap-3 items-center">
				<input
					type="checkbox"
					className="cursor-pointer border-2 rounded-lg w-6 h-6 appearance-none checked:bg-pink-400"
					// checked={isCompleted}
				/>
				<span className="m-0 p-0 text-lg cursor-pointer">{name}</span>
			</div>
		</div>
	)
}

export default TodoItem
