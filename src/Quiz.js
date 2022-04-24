import React from "react";
import {decode} from 'html-entities';

export default function Quiz(props) {
    console.log(props)
    const answerElems = props.possibleAnswers.map(answer => (<p className="answer" key={answer.ansId}>{decode(answer.answer)}</p>))
    return (
        <div>
            <h2 className="question-text">{decode(props.question)}</h2>
            <div className="answers-pane">
                {answerElems}
            </div>
            <hr></hr>
        </div>

    )
}
