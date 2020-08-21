import React from "react";

import Word2vec from "./algorithm";
import Distance from "../Distance";

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
        let statusEl = (
            <p className="api-status">Status: {this.state.apiStatus}</p>
        );

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
                </div>
            </React.Fragment>
        );
    }
}

export default App;
