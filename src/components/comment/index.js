import React from 'react';
import "./styles.css";

export default function(props) {
        return(
            <div className="comment_block">
                <span className="username">@{props.username}:</span>
                <span className="username">@{props.text}:</span>
                <span className="username">@{props.date}:</span>
            </div>
        );
}