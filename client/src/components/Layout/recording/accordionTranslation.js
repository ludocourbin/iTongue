import React, { useState, useEffect } from "react";
import { Accordion, Icon, Image } from "semantic-ui-react";

const AccordionTranslation = ({
    allExpressions,
    taughtLanguages,
    learnedLanguages,
    setTranslationId,
}) => {
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
            console.log(translationsSelected);
        }
    }, [expressionSelected, allExpressions]);

    // const handleChangeTranslation = (e, data) => {
    //     seTranslationSelected(data.value);
    //     const languageObject = data.options.find(
    //         (translation) => translation.value === data.value
    //     );
    //     setTranslationId(languageObject.key);
    // };

    return (
        <Accordion className="container-dropdown_accordion">
            {allExpressions.map((expression, index) => (
                <div key={index} className="">
                    <Accordion.Title
                        active={activeIndex === index}
                        index={index}
                        className={activeIndex === index ? "active-title" : ""}
                        onClick={(e, titleProps) =>
                            handleClick(e, titleProps, expression.englishText)
                        }
                    >
                        {expression.englishText}
                    </Accordion.Title>
                    <Accordion.Content active={activeIndex === index}>
                        {translationsSelected &&
                            translationsSelected.map((traduction) => (
                                <div
                                    onClick={() => setTranslationId(traduction.key)}
                                    key={traduction.flag}
                                    className="accordion-dropdown_traductions_text"
                                >
                                    <Image
                                        src={`https://www.countryflags.io/${traduction.flag}/flat/32.png`}
                                        className="record_flag_image"
                                    />
                                    <span className="expression">{traduction.text}</span>
                                </div>
                            ))}
                    </Accordion.Content>
                </div>
            ))}
        </Accordion>
    );
};

export default AccordionTranslation;
