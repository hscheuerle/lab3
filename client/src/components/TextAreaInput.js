import React, { Component } from 'react'
import PropTypes from 'prop-types'

class TextAreaInput extends Component {
    static propTypes = {
        onText: PropTypes.func.isRequired,
        value: PropTypes.string
    }

    render() {
        const { onText, value } = this.props

        return (
            <textarea
                style={CSS.TextAreaInput}
                onChange={ev => onText(ev.target.value || '')}
                value={value}
            />
        )
    }
}

const CSS = {
    TextAreaInput: {
        display: 'block',
        height: '60%',
        width: '80%',
        margin: '10px auto 0'
    }
}

export {
    TextAreaInput
}