import React from "react";
import { nanoid } from "nanoid";
import arrayShuffle from "array-shuffle";
import Quiz from "./Quiz"

export default function Quizzical() {
    const [allQuizData, setAllQuizData] = React.useState([])

    React.useEffect( () => {
        fetch('https://opentdb.com/api.php?amount=5&category=9&difficulty=medium&type=multiple')
        .then(res => res.json())
        .then(data => {
            //shape the data into a more workable form.
            const fetchedQuizes = data.results
            const nextAllQuizData = []
            for (const quiz of fetchedQuizes) {
                const correctAns = {
                    ansId: nanoid(8),
                    answer: quiz.correct_answer,
                    isSelected: false
                }
                const wrongAns = quiz.incorrect_answers.map(incorrect_ans => {
                    return {ansId: nanoid(8), answer: incorrect_ans, isSelected: false}
                })
                const possibleAns = arrayShuffle([correctAns, ...wrongAns])
                const quizEntry = {
                    quizId: nanoid(),
                    question: quiz.question,
                    correctAnswer: {ansId: correctAns.ansId, answer: correctAns.answer},
                    possibleAnswers: [...possibleAns]
                }
                nextAllQuizData.push(quizEntry)

            }
        setAllQuizData(nextAllQuizData)
        console.log(allQuizData)
        })
    }, [] )

    const quizElements = allQuizData.map(quiz => {
        return (<Quiz key={quiz.quizId}
                      id={quiz.quizId}
                      question={quiz.question}
                      correctAnswer={quiz.correctAnswer}
                      possibleAnswers={quiz.possibleAnswers} />)
    })


    return (
        <div className="quizzical-game">
            {quizElements}
        </div>
    )
}