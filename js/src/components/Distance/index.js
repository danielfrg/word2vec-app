/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { Fragment } from "react";

class Distance extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            waiting: false,
            input: "",
            result: "",
            error: "",
        };
    }

    handleChange = (e) => {
        this.setState({ input: e.target.value });
    };

    handleClick = (e) => {
        if (this.state.input) {
            const { client } = this.props;
            this.setState({ waiting: true, result: "", error: "" });

            client.similar(this.state.input).then((response) => {
                if (response.error) {
                    this.setState({ waiting: false, error: response.error });
                } else {
                    this.setState({ waiting: false, result: response.result });
                }
            });
        }
    };

    ex_france = (e) => {
        e.preventDefault();
        this.setState({ input: "france" });
        this.handleClick(null);
    };
    ex_san_francisco = (e) => {
        e.preventDefault();
        this.setState({ input: "san_francisco" });
        this.handleClick(null);
    };
    ex_apple = (e) => {
        e.preventDefault();
        this.setState({ input: "apple" });
        this.handleClick(null);
    };
    ex_dog = (e) => {
        e.preventDefault();
        this.setState({ input: "dog" });
        this.handleClick(null);
    };

    render() {
        const { apiStatus } = this.props;
        const { waiting } = this.state;

        let ready = false;
        if (apiStatus == "ready") {
            ready = true;
        }

        let contentEl = "";
        if (this.state.error) {
            contentEl = (
                <Fragment>
                    <p className="error">
                        {this.state.error.error_type}:{" "}
                        {this.state.error.message}
                    </p>
                    <p className="error">{this.state.error.stacktrace}</p>
                </Fragment>
            );
        }

        if (this.state.result) {
            let rows = this.state.result.map((result, index) => (
                <tr key={index}>
                    <td className="word">{result[0]}</td>
                    <td className="distance">{result[1]}</td>
                </tr>
            ));

            contentEl = (
                <div className="response">
                    <table>
                        <thead>
                            <tr>
                                <th className="word">Word</th>
                                <th className="distance">Distance</th>
                            </tr>
                        </thead>
                        <tbody>{rows}</tbody>
                    </table>
                </div>
            );
        }

        return (
            <div id="similar" className="col-md-6">
                <div className="box">
                    <div
                        className={`snipper spin ${waiting ? "" : "hide"}`}
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
                                    value={this.state.input}
                                />
                            </div>
                            <div id="similar" className="col-6">
                                <button
                                    className="button"
                                    disabled={waiting || !ready}
                                    onClick={this.handleClick}
                                >
                                    {ready ? "Query" : "loading"}
                                </button>
                            </div>
                        </div>
                    </div>

                    {contentEl}

                    <p className="small">
                        Examples:{" "}
                        <a onClick={this.ex_france} href="#">
                            France
                        </a>
                        ,{" "}
                        <a onClick={this.ex_san_francisco} href="#">
                            San Francisco
                        </a>
                        ,{" "}
                        <a onClick={this.ex_apple} href="#">
                            Apple
                        </a>
                        ,{" "}
                        <a onClick={this.ex_dog} href="#">
                            Dog
                        </a>
                        .
                    </p>
                </div>
            </div>
        );
    }
}

export default Distance;
