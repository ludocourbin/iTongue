import React, { useState, useEffect } from "react";
import { Accordion, Icon } from "semantic-ui-react";

const AccordionTranslation = ({ allExpressions, taughtLanguages, learnedLanguages }) => {
    const [activeIndex, setActiveIndex] = useState(0);
    const [expressionSelected, setExpressionSelected] = useState(null);
    const [translationsSelected, setTranslationsSelected] = useState(null);

    const handleClick = (e, titleProps, englishText) => {
        // console.log(englishText);
        setExpressionSelected(englishText);
        const { index } = titleProps;
        const newIndex = activeIndex === index ? -1 : index;
        setActiveIndex(newIndex);
    };

    useEffect(() => {
        if (expressionSelected) {
            const expression = allExpressions.find(
                (option) => option.englishText === expressionSelected
            );

            const allLanguages = [...taughtLanguages, ...learnedLanguages];

            const filteredLanguages = expression.translations.filter((translation) =>
                allLanguages.find(({ id }) => translation.language.id === id)
            );

            console.log(filteredLanguages);

            const options = filteredLanguages.map((option) => {
                return {
                    key: option.id,
                    value: option.text,
                    text: option.text,
                    flag: option.language.code,
                    language: option.language.id,
                };
            });

            setTranslationsSelected(options);
        }
    }, [expressionSelected, allExpressions]);

    return (
        <Accordion>
            {allExpressions.map((expression, index) => (
                <div className="">
                    <Accordion.Title
                        active={activeIndex === index}
                        index={index}
                        onClick={(e, titleProps) =>
                            handleClick(e, titleProps, expression.englishText)
                        }
                    >
                        <Icon name="dropdown" />
                        {expression.englishText}
                    </Accordion.Title>
                    <Accordion.Content active={activeIndex === index}>
                        <p>
                            A dog is a type of domesticated animal. Known for its loyalty
                            and faithfulness, it can be found as a welcome guest in many
                            households across the world.
                        </p>
                    </Accordion.Content>
                </div>
            ))}
        </Accordion>
    );
};

export default AccordionTranslation;
