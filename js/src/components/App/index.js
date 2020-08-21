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
            // error: {
            //     error_type: "TestError",
            //     message: "Test message",
            //     stacktrace: "From ... \nmore code",
            // },
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

        const spinnerEl = (
            <div className="spinner-border" role="status">
                <span className="sr-only">Loading...</span>
            </div>
        );

        let statusEl = (
            <div className="status-line">
                <p className="api-status">API Status: {statusText}</p>
                {this.state.apiStatus == "ready" ||
                this.state.apiStatus == "error"
                    ? ""
                    : spinnerEl}
            </div>
        );

        let contentEl = "";
        if (this.state.error) {
            contentEl = (
                <div className="error">
                    <p>
                        {this.state.error.error_type
                            ? this.state.error.error_type
                            : "Error"}
                        : {this.state.error.message}
                    </p>
                    <p className="stacktrace">{this.state.error.stacktrace}</p>
                </div>
            );
        } else {
            contentEl = (
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
            );
        }

        return (
            <React.Fragment>
                {statusEl}
                {contentEl}
            </React.Fragment>
        );
    }
}

export default App;
