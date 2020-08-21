import React from "react";

class Distance extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            word: "",
            results: "",
        };
    }

    handleChange = (e) => {
        this.setState({ input: e.target.value });
    };

    handleClick = (e) => {
        const { client } = this.props;

        client.distance(this.state.input).then((response) => {
            if (response.error) {
                this.setState({ apiStatus: "error", error: response.error });
            }
        });
    };

    render() {
        const { apiStatus } = this.props;

        let enabled = true;
        if (apiStatus == "ready") {
            enabled = true;
        }

        let waiting = false;
        // return "waiting";

        return (
            <div id="similar" className="col-md-6">
                <div className="box">
                    <div
                        className={`snipper spin ${"" ? waiting : "hide"}`}
                    ></div>
                    <h2>Top N similar</h2>
                    <p>Find the most similar words</p>
                    <div className="container">
                        <div className="row">
                            <div id="similar" className="col-6 first-col">
                                <input
                                    type="text"
                                    placeholder="WORD"
                                    onChange={this.handleChange}
                                />
                            </div>
                            <div id="similar" className="col-6">
                                <button
                                    className="button"
                                    disabled={!enabled}
                                    onClick={this.handleClick}
                                >
                                    Query
                                </button>
                            </div>
                        </div>
                    </div>
                    {/* <div className="response">
                    <table v-if="data.length > 0">
                        <thead>
                            <tr>
                                <th className="word">Word</th>
                                <th className="distance">Distance</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr v-for="entry in data">
                                <td className="word">"{{ entry[0] }}"</td>
                                <td className="distance">"{{ entry[1] }}"</td>
                            </tr>
                        </tbody>
                    </table>
                </div> */}
                </div>
            </div>
        );
    }
}

export default Distance;
