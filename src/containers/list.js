import React, { PureComponent } from 'react';
import Button from '@material-ui/core/Button';
import Paper from '@material-ui/core/Paper';
import "./style.css"

export default class List extends PureComponent {
    constructor(props) {
        super(props);
        this.state= {
            items: [],
            text:'old text',
            app: props.app
        };
    }

    render() { 
        return (<div> 
            <Paper className="page">
                <Button variant="contained" color="primary" onClick={this.handleClick}>fancy button</Button>
                <p>{this.state.text}</p>
            </Paper>
            </div>)
    }

    handleClick = async e => {
        e.preventDefault();
            this.props.stateChanger({lol:"test"});
            const response = await fetch('/home', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            },
            });
            const body = await response.text();
            this.setState({ text: body });
            
            
    }

    renderButton() { 
        return (
            <button>
                hello
            </button>
        );
    }


}