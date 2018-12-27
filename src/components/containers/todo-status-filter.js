import React, { Component } from 'react';

export default class TodoStatusFilter extends Component{
    state = {
        filter : ''
    }

    onStatusChange = (e) => {
        let filter = e.target.textContent.toLowerCase();
        this.setState({ filter});
        this.props.onStatusChange(filter);
    }

    render(){
        
       
        const buttons = [
            {name: 'all', label: 'All'},
            {name: 'active', label: 'Active'},
            {name: 'done', label: 'Done'}
        ];
        const button = buttons.map(({name, label}) => {
            const isActive = this.props.filter === name;
            const classButton = isActive ? 'btn btn-info' : 'btn btn-outline-secondary';
            return(
                <button 
                key={name}
                type="button"
                className={classButton}
                onClick={this.onStatusChange}>
                    {label}
                </button>
            )
        });

        return(
            <div className="btn-group">
                {button}
            </div>
        );
    }
}