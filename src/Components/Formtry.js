import React, { Component } from 'react'
import {SimpleSelect} from 'react-selectize'

export class Formtry extends Component {
    render() {
        var self = this,
            options = ["apple", "mango", "grapes", "melon", "strawberry"].map(function (fruit) {
                return { label: fruit, value: fruit }
            });

        return <SimpleSelect
            options={options}
            placeholder="Select a fruit"
            theme="material" // can be one of "default" | "bootstrap3" | "material" | ...
            transitionEnter={true}
        />
    }
}

export default Formtry
