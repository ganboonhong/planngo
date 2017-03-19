import React, { Component } from 'react';
import Pagination from '../Pagination';
import _ from 'underscore';
import $ from 'jquery'

export default class List extends Component {
    constructor() {
        super();


        var exampleItems = (() => {
            var tmp = null;

            $.ajax({
                async: false,
                url: 'http://localhost:9000/order',
                type: 'GET',
                dataType: 'json',
            }).done((result) => {
                tmp = result;
            });

            console.log('tmp:' + tmp)
            return tmp;
        })();

        console.log(exampleItems)
 

        // an example array of items to be paged
        // var exampleItems = _.range(1, 151).map(i => { return { id: i, name: 'Item ' + i }; });

        this.state = {
            exampleItems: exampleItems,
            pageOfItems: []
        };
 
        // bind function in constructor instead of render (https://github.com/yannickcr/eslint-plugin-react/blob/master/docs/rules/jsx-no-bind.md)
        this.onChangePage = this.onChangePage.bind(this);
    }
 
    onChangePage(pageOfItems) {
        // update state with new page of items
        this.setState({ pageOfItems: pageOfItems });
    }
 
    render() {
        return (
            <div>
                <div className="container">
                    <div className="text-center">
                        <h1>React - Pagination Example with logic like Google</h1>
                        {this.state.pageOfItems.map(item =>
                            <div key={item.id}>{item.name}</div>
                        )}
                        <Pagination items={this.state.exampleItems} onChangePage={this.onChangePage} />
                    </div>
                </div>
                <hr />
                <div className="credits text-center">
                    <p>
                        <a href="http://jasonwatmore.com" target="_top">JasonWatmore.com</a>
                    </p>
                </div>
            </div>
        );
    }
}
