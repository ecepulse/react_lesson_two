import React, { Component } from 'react';

import DynamicTable from '../components/DynamicTable.js';
import getEWSUsageData from '../handlers/EWSUsageHandler.js';

import { Button, Glyphicon } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';

export default class EWSUsageGrid extends Component {
    EWSUsageHeading: null

    constructor(props) {
        super(props);

        this.state = {
            EWSUsageData: {}
        };

        this._retrieveUsageData = this._retrieveUsageData.bind(this);
        this._parseUsageData = this._parseUsageData.bind(this);

        let refreshButton = 
            <Button
                onClick={() => {
                        this._retrieveUsageData();
                        alert('Completed updating EWS Usage info');
                    }
                }
            >
                Refresh <Glyphicon glyph="refresh" />
            </Button>;
        this.EWSUsageHeading = [refreshButton, 'Lab Name', 'Usage Information'];

        this._retrieveUsageData();
    }

    _retrieveUsageData() {
        getEWSUsageData((data) => { 
            this.setState({ EWSUsageData: data }); 
        });
    }

    _parseUsageData() {
        let tableData = [];
        if (typeof(this.state.EWSUsageData['data']) === 'undefined') {
            return tableData;
        }
        for (let labInfo of this.state.EWSUsageData['data']) {
            let rowData = [];
            rowData.push('');
            rowData.push(labInfo['strlabname']);
            rowData.push(labInfo['inusecount'] + ' / ' + labInfo['machinecount']);
            tableData.push(rowData);
        }
        return tableData;
    }

    render() {
        return(
            <DynamicTable 
                heading={this.EWSUsageHeading}
                data={this._parseUsageData()}
                /> 
        );
    }
}
