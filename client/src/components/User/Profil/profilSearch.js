import React, { useState, useEffect } from 'react';
import { Search, Dropdown } from 'semantic-ui-react';
import './userprofil.scss';

const ProfilSearch = ({ records, recordsFiltered, setRecordsBySearch, fetchAllLanguages, allLanguagesList }) => {

    const [isLoading, setIsLoading] = useState(false);
    const [inputSearch, setInputSearch] =useState("");
    const [languageSelect, setLanguageSelect] =useState("");
    const [results, setResults] =useState([]);

    const filterSearch = (search) => records.filter(record => {
        return record.translation.text.toLowerCase().includes(search) ||
        record.englishTranslation.text.toLowerCase().includes(search)
    });

    const handdleSearchChange = (e, data) => {
        setInputSearch(e.target.value);

        if(filterSearch(data.value) !== [])  {
            setRecordsBySearch(filterSearch(data.value));
        } else {
            setRecordsBySearch(filterSearch([]));
        }
    };

    useEffect(() => {
        fetchAllLanguages();
    }, [fetchAllLanguages]);

    const languages = records.map(record => {
        return record.translation.language;
    });

    const filterLanguages = Array.from(new Set(
        languages.map(language => language.id)))
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

    const handleChangeLanguage = (e, data) => {
        console.log("handleChangeLanguage", data.value); // ID of language
        setLanguageSelect(data.value);
    };

    return (
        <div className="profil-search">
                <Search
                placeholder={"Search.."}
                value={inputSearch}
                onSearchChange={handdleSearchChange}
                size={"large"}
                aligned="center"
                showNoResults={false}
                />
                <Dropdown 
                selection
                placeholder="Languages" 
                name="learnedLanguages" 
                options={optionsLanguages}
                // defaultValue={profilData.modifylearnedLanguages}
                onChange={handleChangeLanguage}
                />
        </div>
    );
};

export default ProfilSearch;