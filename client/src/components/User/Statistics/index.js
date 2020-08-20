import React from 'react';
import { Statistic } from 'semantic-ui-react';

import './statistics.scss'

const Statistics = (props) => {

    const { totalRecords, totalFollow, totalFollower } = props;

    return (
        <Statistic.Group widths="three" size="mini" className="statistics-group">

            <Statistic>
                <Statistic.Value>{totalRecords}</Statistic.Value>
                <Statistic.Label>
                    iRecords
                </Statistic.Label>
            </Statistic>

            <Statistic>
                <Statistic.Value>{totalFollow}</Statistic.Value>
                <Statistic.Label>
                    iFollow
                </Statistic.Label>
            </Statistic>
            
            <Statistic>
                <Statistic.Value>{totalFollower}</Statistic.Value>
                <Statistic.Label>
                    iFollower
                </Statistic.Label>
            </Statistic>

        </Statistic.Group>
    );
};

export default Statistics;