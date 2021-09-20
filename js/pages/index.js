import React from "react";

import Algorithm from "../lib/algorithm";
import Distance from "../components/distance";
import Analogy from "../components/analogy";

class Index extends React.Component {
    constructor(props) {
        super(props);

        const testError = {
            error_type: "TestError",
            message: "Test message",
            stacktrace: "From ... \nmore code",
        };

        this.state = {
            apiStatus: "init",
            error: "",
        };
    }

    componentDidMount() {
        const client = new Algorithm();

        this.setState({ client: client });

        client.ping().then((response) => {
            console.log("API Ping response:");
            console.log(response);

            if (response.error) {
                this.setState({ apiStatus: "error", error: response.error });
            } else {
                this.setState({ apiStatus: "loading" });

                client.load().then((response) => {
                    console.log("API Load response:");
                    console.log(response);

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
        const { client, apiStatus, error } = this.state;

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

        let content = "";
        if (error) {
            content = (
                <div className="mx-auto max-w-screen-md text-primary font-mono">
                    <p>
                        {error.error_type ? error.error_type : "Error"}:{" "}
                        {error.message}
                    </p>
                    <p>{error.stacktrace}</p>
                </div>
            );
        } else {
            content = (
                <div className="grid gap-2 grid-cols-1 md:grid-cols-2 justify-evenly">
                    <Distance client={client} apiStatus={apiStatus}></Distance>
                    <Analogy client={client} apiStatus={apiStatus}></Analogy>
                </div>
            );
        }

        return (
            <div className="mx-auto max-w-screen-lg flex flex-col h-screen justify-between">
                <header className="my-10">
                    <h1 className="text-center text-white title text-7xl lg:text-title font-comic">
                        WORD2VEC
                    </h1>
                    <h2 className="text-center text-gray-800 text-3xl subtitle font-comic">
                        Word embedding functions
                    </h2>
                    <div className="text-center font-light text-xs text-gray-700">
                        <p className="api-status">API Status: {statusText}</p>
                        {apiStatus == "ready" || apiStatus == "error" ? (
                            ""
                        ) : (
                            <svg
                                className="animate-spin h-5 w-5 mr-3 ..."
                                viewBox="0 0 24 24"
                            ></svg>
                        )}
                    </div>
                </header>

                <main className="mb-auto">{content}</main>

                <footer className="mx-auto my-4 py-5 font-light">
                    <p className="text-primary text-sm">
                        Built by{" "}
                        <a
                            className="underline hover:text-white"
                            href="https://danielfrg.com/"
                        >
                            Daniel Rodriguez
                        </a>
                        .{" "}
                        <a
                            className="underline hover:text-white"
                            href="https://github.com/danielfrg/word2vec-app"
                        >
                            Code on Github
                        </a>
                        .{" "}
                        <a
                            className="underline hover:text-white"
                            href="https://danielfrg.com/blog/2018/09/word2vec-app-algorithmia/"
                        >
                            More info
                        </a>
                        .
                    </p>
                </footer>
            </div>
        );
    }
}

export default Index;
