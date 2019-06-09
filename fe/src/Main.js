import React, {Component} from 'react';
import Speech from "./Speech";

class Main extends Component {

    constructor() {
        super();
        this.state = {
            topic: '',
            changeTime: 0
        }
    }

    componentDidMount() {

        let t = this;

        window.addEventListener("keyup", function(e) {
            let key = e.key;

            switch(key) {
                case '0': t.changeFont(); break;
                case '1': t.topicBusiness(); break;
                case '2': t.topicEntertainment(); break;
                case '3': t.topicGeneral(); break;
                case '4': t.topicHealth(); break;
                case '5': t.topicScience(); break;
                case '6': t.topicSports(); break;
                case '7': t.topicTechnology(); break;
                case 'Escape': t.setState({topic: '', change: 'default', changeTime: Date.now()}); break;
                case 'ArrowLeft': t.setState({change: 'prev', changeTime: Date.now()}); break;
                case 'ArrowRight': t.setState({change: 'next', changeTime: Date.now()}); break;
                case 'p': t.setState({change: 'pause', changeTime: Date.now()}); break;
                default: console.log(key);
            }
        });
    }

    changeFont(){
        let font = document.getElementsByClassName('App')[0].style.fontFamily;
        document.getElementsByClassName('App')[0].style.fontFamily = (font == 'BRAILLE1') ? '' : 'BRAILLE1';
    }


    topicBusiness() {
        if(this.state.topic === '') this.setState({topic : 'business'});
    }

    topicSports() {
        if(this.state.topic === '') this.setState({topic : 'sports'});
    }

    topicGeneral() {
        if(this.state.topic === '') this.setState({topic : 'general'});
    }

    topicEntertainment() {
        if(this.state.topic === '') this.setState({topic : 'entertainment'});
    }

    topicHealth() {
        if(this.state.topic === '') this.setState({topic : 'health'});
    }

    topicScience() {
        if(this.state.topic === '') this.setState({topic : 'science'});
    }

    topicTechnology() {
        if(this.state.topic === '') this.setState({topic : 'technology'});
    }

    buttonClasses(button) {
        if (button === this.state.topic) return "btn btn-success";
        return "btn btn-primary";
    }

    render() {
        return <div id='viewport'>
            <button type="button" id="toggle_font" className='btn btn-info'>Toggle font </button>
            <div id='choose'> <b> CHOOSE THE CATEGORY </b></div>
            <div id="buttons">
                <button type="button" className={this.buttonClasses('business')}>Business</button>
                <button type="button" className={this.buttonClasses('entertainment')}>Entertainment</button>
                <button type="button" className={this.buttonClasses('general')}>General</button>
                <button type="button" className={this.buttonClasses('health')}>Health</button>
                <button type="button" className={this.buttonClasses('science')}>Science</button>
                <button type="button" className={this.buttonClasses('sports')}>Sports</button>
                <button type="button" className={this.buttonClasses('technology')}>Technology</button>
            </div>
            <Speech topic={this.state.topic} change={this.state.change} changeTime={this.state.changeTime} />
            <div id="hint">
                <table className="table table-striped table-sm">
                    <thead className="thead-dark">
                    <tr>
                        <th scope="col">Keyboard</th>
                        <th scope="col">Action</th>
                    </tr>
                    </thead>
                    <tbody>
                    <tr>
                        <th scope="row">0</th>
                        <td>Toggle font</td>
                    </tr>
                    <tr>
                        <th scope="row">→</th>
                        <td>Next message</td>
                    </tr>
                    <tr>
                        <th scope="row">←</th>
                        <td>Previous message</td>
                    </tr>
                    <tr>
                        <th scope="row">P</th>
                        <td>Pause/Play message</td>
                    </tr>
                    <tr>
                        <th scope="row">Esc</th>
                        <td>Main Menu</td>
                    </tr>
                    <tr>
                        <th scope="row">1</th>
                        <td>Business messages</td>
                    </tr>
                    <tr>
                        <th scope="row">2</th>
                        <td>Entertainment messages</td>
                    </tr>
                    <tr>
                        <th scope="row">3</th>
                        <td>General messages</td>
                    </tr>
                    <tr>
                        <th scope="row">4</th>
                        <td>Health messages</td>
                    </tr>
                    <tr>
                        <th scope="row">5</th>
                        <td>Science messages</td>
                    </tr>
                    <tr>
                        <th scope="row">6</th>
                        <td>Sports messages</td>
                    </tr>
                    <tr>
                        <th scope="row">7</th>
                        <td>Technology messages</td>
                    </tr>
                    </tbody>
                </table>
            </div>
        </div>
    }
}

export default Main;

