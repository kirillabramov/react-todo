import React, { Component } from 'react';



export default class TodoAddItem extends Component{


    render(){
        const { addItem } = this.props;
        return(
            <button 
            type='button'
            className="btn btn-success"
            onClick={addItem}>
                Add Task
            </button>
        );
    }
}