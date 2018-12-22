import React from 'react';

const TodoHeader = ({todo, done}) => {
    return(
        <div className="todo__title">
            <h1>Todo List</h1>
            <span>
                 <span className="todo__title--more">{todo} more to do</span>, 
                 <span className="todo__title--done"> {done} done</span> </span>
        </div>
    );
}   

export default TodoHeader;