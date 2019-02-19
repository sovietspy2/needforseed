import React from 'react';
import "./styles.css";
import Comment from "../comment";

export default class CommentList extends React.PureComponent {

    render() {

        const renderContent = (comments) => comments.map(comment=>{
            debugger;
                return(
                    <Comment username={comment.username} text={comment.text} date={comment.date}/>
                );
        });

        return (
   
            <div>
                {renderContent(this.props.comments)}
            </div>
        );
    }
    
}