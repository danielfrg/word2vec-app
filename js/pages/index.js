import React from "react";

import { withStyles } from "@material-ui/core/styles";
import { Grid } from "@material-ui/core";
import CircularProgress from "@material-ui/core/CircularProgress";

import Algorithm from "../lib/algorithm";
import Distance from "../components/Distance";
import Analogy from "../components/Analogy";

const styles = (theme) => ({
    space: {},
});

class Index extends React.Component {
    constructor(props) {
        super(props);

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
        const client = new Algorithm();

        this.setState({ client: client });

        // client.ping().then((response) => {
        //     if (response.error) {
        //         this.setState({ apiStatus: "error", error: response.error });
        //     } else {
        //         this.setState({ apiStatus: "loading" });

        //         this.client.load().then((response) => {
        //             if (response.error) {
        //                 this.setState({
        //                     apiStatus: "error",
        //                     error: response.error,
        //                 });
        //             } else {
        //                 this.setState({ apiStatus: "ready" });
        //             }
        //         });
        //     }
        // });
    }

    render() {
        const { classes, client, apiStatus, error } = this.state;

        let statusText = "";
        if (apiStatus == "init") {
            statusText = "Initializing API (~1-2 mins)";
        } else if (apiStatus == "loading") {
            statusText = "Loading model (~5 mins)";
        } else if (apiStatus == "ready") {
            statusText = "Model ready";
        } else if (apiStatus == "error") {
            statusText = "ERROR";
        }

        let statusEl = (
            <div className="status-line">
                <p className="api-status">API Status: {statusText}</p>
                {apiStatus == "ready" || apiStatus == "error" ? (
                    ""
                ) : (
                    <CircularProgress size={10} color="inherit" />
                )}
            </div>
        );

        let content = "";
        if (error) {
            content = (
                <div className="error">
                    <p>
                        {error.error_type ? error.error_type : "Error"}:{" "}
                        {error.message}
                    </p>
                    <p className="stacktrace">{error.stacktrace}</p>
                </div>
            );
        } else {
            content = (
                <Grid
                    container
                    className="boxes"
                    spacing={3}
                    justifyContent="center"
                >
                    <Grid item xs={5}>
                        <Distance client={client} apiStatus={apiStatus} />
                    </Grid>
                    <Grid item xs={5}>
                        <Analogy client={client} apiStatus={apiStatus} />
                    </Grid>
                </Grid>
            );
        }

        return (
            <>
                <Grid container className="container" spacing={4}>
                    <Grid item xs={12}>
                        <header>
                            <h1 className="title">WORD2VEC</h1>
                            <h2 className="subtitle">
                                Word embedding functions
                            </h2>
                            {statusEl}
                        </header>
                    </Grid>

                    <Grid item xs={12}>
                        {content}
                    </Grid>

                    <Grid item xs={12} className="inputs">
                        <footer>
                            <p>
                                Built by
                                <a href="https://danielfrg.com/">
                                    Daniel Rodriguez
                                </a>
                                . Powered by{" "}
                                <a href="https://algorithmia.com/algorithms/danielfrg/word2vec">
                                    Algorithmia
                                </a>
                                .{" "}
                                <a href="https://github.com/danielfrg/word2vec-app">
                                    Code on Github
                                </a>
                                .{" "}
                                <a href="https://danielfrg.com/blog/2018/09/word2vec-app-algorithmia/">
                                    More info
                                </a>
                                .
                            </p>
                        </footer>
                    </Grid>
                </Grid>
            </>
        );
    }
}

export default withStyles(styles, { withTheme: true })(Index);
