import React, {Component} from 'react';
import {getArticles} from "./news_parser/parser";
import playImg from './img/play.png';
import pauseImg from './img/pause.png';

const URL = 'http://169.51.194.93:30080/synthesize?text=';

class Speech extends Component {

    constructor() {
        super();
        this.readMessage = this.readMessage.bind(this);
        this.state = {
            title: '',
            message: '',
            iterator: '',
            paused: false
        }
    }

    componentWillReceiveProps(nextProps) {
        if (this.props.changeTime !== nextProps.changeTime) {
            // window.audio.pause();
            this.checkChange(nextProps.change);
        }

        if (nextProps.topic && nextProps.topic !== '' && this.props.topic !== nextProps.topic) {
            this.handleSpeech(nextProps.topic);
        }
    }

    checkChange(c) {
        switch(c) {
            case 'prev': this.doPrev(); break;
            case 'next': this.doNext(); break;
            case 'default': this.doDefault(); break;
            case 'pause': this.state.paused ? this.doUnpause() : this.doPause();
        }
    }

    doUnpause() {
        window.audio.play();
        this.setState({paused: false});
    }

    doPause() {
        this.setState({paused: true});
    }

    doPrev() {
        if(this.state.iterator > 0 ) {
            window.audio.pause();
            this.readMessage(this.state.data, this.state.iterator - 1);
        } else {
            // window.audio.play();
        }
    }

    doNext() {
        if(this.state.iterator < this.state.data.length - 1) {
            window.audio.pause();
            this.readMessage(this.state.data, this.state.iterator + 1);
        } else {
            // window.audio.play();
        }
    }

    doDefault() {
        // end, choose topic again
    }

    replaceSpaces(str) {
        if (str === undefined) return "Empty title";
        return str.replace(" ", "%20");
    }

    handleSpeech(topic) {
        getArticles(topic).then((result)=>{
            this.setState({data : result.slice(0, 5)}); // do not slice
            this.readMessage(result, 0);
        });
    }

    readMessage(res, i) {
        this.setState({
            title: res[i].title ? res[i].title : 'Empty title',
            message: res[i].description ? res[i].description : 'Empty message',
            iterator: i
        })

        let str = this.replaceSpaces(res[i].title.substring(0, 30)); // do not use substring

        let url = URL + str;
        let t = this;

        window.audio = new Audio();
        window.audio.src = url;
        window.audio.play();
        window.audio.addEventListener("ended", function next() {
            if (i < 4) t.readMessage(res , i + 1); // (i+1 < res.length)
        });
    }

    render() {
        return <div>
            {
                this.props.topic !== '' ?
                    <div className='box'>
                        <img className='play-pause' src={this.state.paused ? playImg : pauseImg} alt=""/>
                        <div>
                            <i className="message-number">MESSSAGE NUMBER {this.state.iterator}:</i>
                        </div>
                    </div>

                :
                    <React.Fragment/>
            }
            <div className='message'>
                <div>
                <i className='message-title'>{this.state.title}</i>

            </div>

            <div className='message-text'>
                {this.state.message}
            </div>
            </div>
        </div>
    }
}

export default Speech;

