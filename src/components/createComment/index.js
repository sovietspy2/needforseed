import React from 'react';
import "./styles.css";
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import Icon from '@material-ui/icons/Send';

export default function(props) {
    return (
        <div className="create_post_main">
            <TextField
                value={props.value}
                onChange={props.handleChange}

                label="Your comment"
                style={{ margin: 8 }}
                placeholder="Write your comment here :)"
                fullWidth
                multiline
                rowsMax="2"
                margin="normal"
                variant="outlined"
                InputLabelProps={{
                shrink: true,
                }}  
            />
            <Button onClick={props.handleClick}><Icon/></Button>
        </div>
    );
}