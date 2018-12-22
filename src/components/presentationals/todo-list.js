import React from 'react';
import TodoListItem from '../containers/todo-list-item';


const TodoList = ({todos, onDeleted, onToggleImportant, onToggleDone}) => {
    return(
            <ul className='todo__list'>
                {todos.map((item) =>{
                    return (
                    <TodoListItem 
                    onDeleted={(e) => {
                        e.stopPropagation();
                        onDeleted(item.key)}}
                    onToggleDone={onToggleDone}
                    onToggleImportant={onToggleImportant}
                    {...item}/>
                    );
                })}
            </ul>
    );
}


export default TodoList;