import React, { useState, useEffect } from 'react';
import { Search, Dropdown } from 'semantic-ui-react';
import './userprofil.scss';

const ProfilSearch = ({ records, recordsFiltered, setRecordsBySearch, fetchAllLanguages, allLanguagesList }) => {

    const [isLoading, setIsLoading] = useState(false);
    const [inputSearch, setInputSearch] =useState("");
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


    const optionsLanguages = allLanguagesList.map(language => {
        return {
            key: language.id,
            value: language.id,
            text: language.name,
            flag: language.code,
        };
    });

    return (
        <div className="profil-search">
                <Search
                placeholder={"Search.."}
                value={inputSearch}
                onSearchChange={handdleSearchChange}
                results={results}
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
                //onChange={handdleInputChange}
                />
        </div>
    );
};

export default ProfilSearch;