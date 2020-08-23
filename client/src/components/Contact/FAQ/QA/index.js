import React, {useState} from 'react'
import { Icon } from 'semantic-ui-react';

const QA = (props) => {
    console.log('question ' + props.question + ', answer ' + props.answer);
    const [showAnswer, setShowAnswer] = useState(false);
    const onClickDiv = () => {
        if (showAnswer === false) {
            setShowAnswer(true);

        }
        else if (showAnswer === true) {
            setShowAnswer(false);

        }
    }
    console.log('FAQ');
    return (
        <section>
            <div className="container">
                <div className="accordion">
                    <div className="accordion-item" id="question1">
                        <a className="accordion-link" href="#question1">
                            {props.question}
                            <Icon className="accordion-link-icon-show" name='angle down' size='small' />
                            <Icon className="accordion-link-icon-hide" name='angle up' size='small' />
                        </a>
                        <div className="answer">
                            <p>
                                {props.answer}
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
};
export default QA;