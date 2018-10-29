import React, { Component } from 'react'
import PropTypes from 'prop-types'

class FileInputToText extends Component {
    constructor(props) {
        super(props)

        const { onText } = this.props

        this.reader = new FileReader()
        this.reader.onload = ev => {
            const { result } = ev.target;
            onText(result)
        }
    }

    render() {
        return (
            <input type="file" onChange={this.onChange} />
        );
    }
    onChange = ev => {
        const [file1] = ev.target.files;
        this.reader.readAsText(file1);
    }
}

FileInputToText.propTypes = {
    onText: PropTypes.func.isRequired
}

export {
    FileInputToText
} 