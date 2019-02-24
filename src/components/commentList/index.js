import React from 'react';
import "./styles.css";
import Comment from "../comment";

export default class CommentList extends React.PureComponent {

    render() {

        const renderContent = (comments) => comments.map(comment=>{
                return(
                    <Comment key={comment.date+comment.username} username={comment.username} text={comment.text} date={comment.date}/>
                );
        });

        return (
   
            <div>
                {renderContent(this.props.comments)}
            </div>
        );
    }
    
}