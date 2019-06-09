import React, {Component} from 'react';
import Speech from "./Speech";

class Main extends Component {

    constructor() {
        super();
        this.state = {
            topic: '',
            esc: false,
            changeTime: 0
        }
    }

    componentDidMount() {

        let t = this;

        window.addEventListener("keyup", function(e) {
            let key = e.key;

            switch(key) {
                case '1': t.topicBusiness(); break;
                case '2': t.topicEntertainment(); break;
                case '3': t.topicGeneral(); break;
                case '4': t.topicHealth(); break;
                case '5': t.topicScience(); break;
                case '6': t.topicSports(); break;
                case '7': t.topicTechnology(); break;
                case 'Escape': t.setState({change: 'default', changeTime: Date.now()}); break;
                case 'ArrowLeft': t.setState({change: 'prev', changeTime: Date.now()}); break;
                case 'ArrowRight': t.setState({change: 'next', changeTime: Date.now()}); break;
                case ' ': t.setState({change: 'pause', changeTime: Date.now()}); break;
                default: console.log(key);
            }
        });
    }

    topicBusiness() {
        this.setState({topic : 'business'});
    }

    topicSports() {
        this.setState({topic : 'sports'});
    }

    topicGeneral() {
        this.setState({topic : 'general'});
    }

    topicEntertainment() {
        this.setState({topic : 'entertainment'});
    }

    topicHealth() {
        this.setState({topic : 'health'});
    }

    topicScience() {
        this.setState({topic : 'science'});
    }

    topicTechnology() {
        this.setState({topic : 'technology'});
    }

    toggle() {

    }

    buttonClasses(button) {
        if (button === this.state.topic) return "btn btn-success";
        return "btn btn-primary";
    }

    render() {
        return <div id='viewport'>
            <div id='choose'> CHOOSE CATEGORY</div>
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
                        <th scope="row">→</th>
                        <td>Next message</td>
                    </tr>
                    <tr>
                        <th scope="row">←</th>
                        <td>Previous message</td>
                    </tr>
                    <tr>
                        <th scope="row">Space</th>
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

