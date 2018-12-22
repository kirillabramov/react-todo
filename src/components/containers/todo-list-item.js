import React, {Component} from 'react';


export default class TodoListItem extends Component{






    render(){
        const { text, onDeleted, onToggleImportant, onToggleDone } = this.props;

        let classNames = 'todo__item';
        // if(done){
        //     classNames += ' todo__item--done';
        // } 
        // if(important){
        //     classNames += ' todo__item--important';
        // }

        return(
            <li 
            className={classNames} 
            onClick={onToggleDone}>
                <span className="todo__text">{text}</span>
                <div className="todo__item-btn">
                    <button
                    type="button"
                    className="btn btn-outline-success btn-sm"
                    onClick={onToggleImportant}>
                        <i className="fa fa-exclamation"></i>
                    </button>
                    <button
                    type="button"
                    className="btn btn-outline-danger btn-sm"
                    onClick={onDeleted}>
                        <i className="fa fa-trash-o"></i>
                    </button>
                </div>
            </li>
        )
    }
}