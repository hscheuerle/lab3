import React, { Component } from 'react';
import './App.css';
import { FileInputToText } from '../components/FileInputToText'
import { TextAreaInput } from '../components/TextAreaInput'
import { PostTextButton } from '../components/PostTextButton'


class App extends Component {
    constructor(props) {
        super(props)

        this.state = {
            text: ''
        }
    }

    render() {
        const { text } = this.state
        return (
            <div className="App">
                <FileInputToText onText={this.handleText} />
                <TextAreaInput onText={this.handleText} />
                <PostTextButton text={text}/>
            </div>
        );
    }

    handleText = (text) => {
        this.setState({ text })
    }
}

export default App;