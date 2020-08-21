import React from "react";

import Word2vec from "./algorithm";
import Distance from "../Distance";
import Analogy from "../Analogy";

class App extends React.Component {
    constructor(props) {
        super(props);

        this.client = new Word2vec();

        this.state = {
            apiStatus: "init",
            error: "",
        };
    }

    componentDidMount() {
        this.client.ping().then((response) => {
            if (response.error) {
                this.setState({ apiStatus: "error", error: response.error });
            } else {
                this.setState({ apiStatus: "loading" });

                this.client.load().then((response) => {
                    if (response.error) {
                        this.setState({
                            apiStatus: "error",
                            error: response.error,
                        });
                    } else {
                        this.setState({ apiStatus: "ready" });
                    }
                });
            }
        });
    }

    render() {
        let statusText = "";
        if (this.state.apiStatus == "init") {
            statusText = "Initializing API (~1-2 mins)";
        } else if (this.state.apiStatus == "loading") {
            statusText = "Loading model (~5 mins)";
        } else if (this.state.apiStatus == "ready") {
            statusText = "Model ready";
        }
        let statusEl = <p className="api-status">Status: {statusText}</p>;

        let errorEl = "";
        if (this.state.error) {
            errorEl = (
                <p className="api-status">
                    {this.state.error.error_type}: {this.state.error.message}
                </p>
            );
        }

        return (
            <React.Fragment>
                {statusEl}
                {errorEl}
                <div className="row boxes">
                    <Distance
                        client={this.client}
                        apiStatus={this.state.apiStatus}
                    />
                    <Analogy
                        client={this.client}
                        apiStatus={this.state.apiStatus}
                    />
                </div>
            </React.Fragment>
        );
    }
}

export default App;
