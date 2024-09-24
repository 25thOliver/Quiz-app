import React, { useState, useRef } from 'react';
import './Quiz.css';
import { data } from '../../assets/data';

const Quiz = () => {
    const [index, setIndex] = useState(0);
    const [lock, setLock] = useState(false);
    const [score, setScore] = useState(0);

    const Option1 = useRef(null);
    const Option2 = useRef(null);
    const Option3 = useRef(null);
    const Option4 = useRef(null);

    const optionArray = [Option1, Option2, Option3, Option4];
    const question = data[index]; 

    console.log("Current Question:", question);

    const checkAns = (e, ans) => {
        if (!lock) {
            if (question.ans === ans) {
                e.target.classList.add("correct");
                setScore(prev => prev + 1);
            } else {
                e.target.classList.add("wrong");
                optionArray[question.ans - 1].current.classList.add("correct");
            }
            setLock(true); // Lock after checking the answer
        }
    };

    const handleNext = () => {
        if (lock) {
            if (index < data.length - 1) {
                setIndex(prevIndex => prevIndex + 1); // Use function form to update state
                setLock(false); // Reset lock for the next question
                optionArray.map((option)=> {
                    option.current.classList.remove("wrong");
                    option.current.classList.remove("correct");
                    return null;
                }
                )
            } else {
                alert(`Quiz completed! Your score: ${score}/${data.length}`);
            }
        }
    };

    return (
        <div className='container'>
            <h1>Quiz App</h1>
            <hr />
            <h2>{index + 1}. {question.question}</h2>
            <ul>
                <li ref={Option1} onClick={(e) => checkAns(e, 1)}>{question.option1}</li>
                <li ref={Option2} onClick={(e) => checkAns(e, 2)}>{question.option2}</li>
                <li ref={Option3} onClick={(e) => checkAns(e, 3)}>{question.option3}</li>
                <li ref={Option4} onClick={(e) => checkAns(e, 4)}>{question.option4}</li>
            </ul>
            <button onClick={handleNext} disabled={!lock}>Next</button>
            <div className='index'>{index + 1} of {data.length} questions</div>
        </div>
    );
};

export default Quiz;