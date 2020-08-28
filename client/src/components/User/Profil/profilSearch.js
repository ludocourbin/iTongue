import React, { useState, useEffect } from 'react';
import { Dropdown, Input } from 'semantic-ui-react';
import './userprofil.scss';

const ProfilSearch = ({ records, setRecordsBySearch}) => {

    const [inputSearch, setInputSearch] =useState({ search: '', lang: null });

    useEffect(() => {
        if(inputSearch.search && !inputSearch.lang)  {
            setRecordsBySearch(filterSearch(inputSearch.search))
        } else if (inputSearch.search && inputSearch.lang) {
            setRecordsBySearch(filterSearch(inputSearch.search,inputSearch.lang))
        } else {
            setRecordsBySearch([]);
        }
    }, [inputSearch]);

    const filterSearch = (search, langId) => {
        const filteredRecords = records && records.filter(record => {
            const regexp = new RegExp(search, "i");
            return (regexp.test(record.translation.text)
                || regexp.test(record.englishTranslation.text)) 
                && (!langId || record.translation.language.id == langId);
        });
        return filteredRecords;
    };

    const handdleChange = (e, data) => {
        setInputSearch({
            search: e.target.name === "search" ? e.target.value : inputSearch.search,
            lang: data.name === "lang" ? data.value : null
        });
    };

    const languages = records && records.map(record => {
        return record.translation.language;
    });

    const filterLanguages = Array.from(new Set(
        languages && languages.map(language => language.id)))
        .map(id => {
            return languages.find(lang => lang.id === id);
        }
    );

    const optionsLanguages = filterLanguages.map(language => {
        return {
            key: language.id,
            value: language.id,
            text: language.name,
            flag: language.code,
        };
    });

    return (
        <div className="profil-search">
            <Input
            placeholder={"Search.."}
            value={inputSearch.search}
            onChange={handdleChange}
            size={"large"}
            name='search'
            icon='search'
            />
            <Dropdown 
            selection
            placeholder="Languages" 
            name="lang" 
            options={optionsLanguages}
            onChange={handdleChange}
            minCharacters={0}
            />
        </div>
    );
};

export default ProfilSearch;