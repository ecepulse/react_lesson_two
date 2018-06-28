import React, { Component } from 'react';

import { Table } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';

export default class DynamicTable extends Component {
    constructor(props) {
        super(props);
        this._renderTableHeader = this._renderTableHeader.bind(this);
        this._renderTableBody = this._renderTableBody.bind(this);
        this._rendTableBodyElems = this._rendTableBodyElems.bind(this);
    }

    _renderTableHeader() {
        let headingComponents = [];
        for (let titles of this.props.heading) {
            headingComponents.push(<th key={titles}>{titles}</th>);
        }
        return headingComponents; 
    }

    // All table body components together
    _renderTableBody() {
        let bodyComponents = [];
        let idx = 1;
        for (let arr of this.props.data) {
            bodyComponents.push(
                <tr key={idx}>
                {this._rendTableBodyElems(arr)}
                </tr>
            );
            ++idx;
        }
        return bodyComponents;
    }

    // Each individual body row
    _rendTableBodyElems(bodyArr) {
        let bodyElems = [];
        for (let bodyElem of bodyArr) {
            bodyElems.push(<td key={bodyElem} >{bodyElem}</td>);
        }
        return bodyElems;
    }

    render() {
        return (
            <Table striped bordered condensed hover responsive>
                <thead>
                    <tr>
                        {this._renderTableHeader()}
                    </tr>
                </thead>
                <tbody>
                    {this._renderTableBody()}
                </tbody>
            </Table>
        );
    }
}
