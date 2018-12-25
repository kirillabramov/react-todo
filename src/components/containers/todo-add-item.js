import React, { Component } from 'react';



export default class TodoAddItem extends Component{

    state = {
        text: ''
    };

    handleInputChange = (e) => {
        this.setState({
            text: e.target.value
        });
        
    };
    onSubmit = (e) => {
        e.preventDefault();
        let todoInput = document.getElementById('todoInput');
        if(this.state.text){
            this.props.addItem(this.state.text);
            todoInput.classList.remove('todo__form--error');
            this.setState({
                text: ''
            });
        } else {
            todoInput.classList.add('todo__form--error');
        }
    };

    render(){
        return(
            <form 
            onSubmit={this.onSubmit}
            className="todo__form d-flex">
                <input
                    id="todoInput"
                    type="text"
                    value={this.state.text}
                    onChange={this.handleInputChange}
                    className="form-control"
                    placeholder="What needs to be done?" />
                <button 
                type='submit'
                className="btn btn-outline-secondary">
                    Add Task
                </button>
            </form>
        );
    }
}