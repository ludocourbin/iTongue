import React from 'react';
import { Icon, Statistic } from 'semantic-ui-react';

import './statistics.scss'

const Statistics = () => {

    return (
        <Statistic.Group widths="three" size="mini" className="statistics-group">

            <Statistic>
                <Statistic.Value>1478</Statistic.Value>
                <Statistic.Label>
                    iRecords
                </Statistic.Label>
            </Statistic>

            <Statistic>
                <Statistic.Value>547</Statistic.Value>
                <Statistic.Label>
                    iFollow
                </Statistic.Label>
            </Statistic>
            
            <Statistic>
                <Statistic.Value>645</Statistic.Value>
                <Statistic.Label>
                    iFollower
                </Statistic.Label>
            </Statistic>

        </Statistic.Group>
    );
};

export default Statistics;