import React from 'react';
import "./styles.css";
import TimeAgo from 'javascript-time-ago';
import en from 'javascript-time-ago/locale/en'

export default function(props) {
        TimeAgo.addLocale(en);
        const timeAgo = new TimeAgo('en-US')
        return(
            <div className="fuck_wrapper">
            <div className="comment_block">
                <div className="username">@{props.username}: </div>
                <div className="text">{props.text}</div>
                <div className="date">{timeAgo.format(new Date(props.date))}</div>
            </div>
            </div>
        );
}