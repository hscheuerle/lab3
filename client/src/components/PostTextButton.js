import React, { Component } from 'react'
import PropTypes from 'prop-types'

class PostTextButton extends Component {
    static propTypes = {
        text: PropTypes.string.isRequired
    }

    render() {
        return (
            <button onClick={this.handleClick}>
                classify text
            </button>
        )
    }

    handleClick = () => {
        const { text } = this.props
        fetch('/classify', {
            method: 'POST',
            body: JSON.stringify({
                text: text
            }),
            headers: {
                'Content-Type': 'application/json'
            }
        }).then(res => {
            return res.json()
        }).then(json => {
            console.log(json.class)
        }).catch(err => {
            console.log(err)
        })
    }
}

export {
    PostTextButton
} 