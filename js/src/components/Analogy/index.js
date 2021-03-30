/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { Fragment, useState } from "react";

class Analogy extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            waiting: false,
            input_pos1: "",
            input_pos2: "",
            input_pos3: "",
            input_neg1: "",
            input_neg2: "",
            input_neg3: "",
            result: "",
            error: "",
        };
    }

    handleChange = (e) => {
        this.setState({ [e.target.name]: e.target.value });
    };

    handleClick = (e) => {
        const { client } = this.props;

        const pos = [
            this.state.input_pos1,
            this.state.input_pos2,
            this.state.input_pos3,
        ].filter(Boolean);
        const neg = [
            this.state.input_neg1,
            this.state.input_neg2,
            this.state.input_neg3,
        ].filter(Boolean);

        if (pos.length > 0 || neg.length > 0) {
            this.setState({ waiting: true, result: "", error: "" });

            client.analogy(pos, neg).then((response) => {
                if (response.error) {
                    this.setState({
                        waiting: false,
                        error: response.error,
                    });
                } else {
                    // console.log(response);
                    this.setState({ waiting: false, result: response.result });
                }
            });
        }
    };

    ex_queen = (e) => {
        e.preventDefault();
        this.setState({
            input_pos1: "king",
            input_pos2: "woman",
            input_pos3: "",
            input_neg1: "man",
            input_neg2: "",
            input_neg3: "",
        });
        this.handleClick(null);
    };

    ex_cold = (e) => {
        e.preventDefault();
        this.setState({
            input_pos1: "hot",
            input_pos2: "winter",
            input_pos3: "",
            input_neg1: "summer",
            input_neg2: "",
            input_neg3: "",
        });
        this.handleClick(null);
    };

    ex_niece = (e) => {
        e.preventDefault();
        this.setState({
            input_pos1: "girl",
            input_pos2: "nephew",
            input_pos3: "",
            input_neg1: "boy",
            input_neg2: "",
            input_neg3: "",
        });
        this.handleClick(null);
    };

    ex_madrid = (e) => {
        e.preventDefault();
        this.setState({
            input_pos1: "france",
            input_pos2: "italy",
            input_pos3: "spain",
            input_neg1: "paris",
            input_neg2: "rome",
            input_neg3: "",
        });
        this.handleClick(null);
    };
    ex_unicorn = (e) => {
        e.preventDefault();
        this.setState({
            input_pos1: "mythical_creature",
            input_pos2: "horse",
            input_pos3: "magical",
            input_neg1: "",
            input_neg2: "",
            input_neg3: "",
        });
        this.handleClick(null);
    };

    render() {
        const { apiStatus } = this.props;
        const { waiting } = this.state;

        let ready = false;
        if (apiStatus == "ready") {
            ready = true;
        }

        let errorEl = "";
        if (this.state.error) {
            errorEl = (
                <Fragment>
                    <p className="error">
                        {this.state.error.error_type}:{" "}
                        {this.state.error.message}
                    </p>
                    <p className="error">{this.state.error.stacktrace}</p>
                </Fragment>
            );
        }

        let tableEl = "";
        if (this.state.result) {
            let rows = this.state.result.map((result, index) => (
                // <li key={index}>{result}</li>
                <tr key={index}>
                    <td className="word">{result[0]}</td>
                    <td className="distance">{result[1]}</td>
                </tr>
            ));

            // <tr v-for="entry in data">
            //     <td className="word">"{{ entry[0] }}"</td>
            //     <td className="distance">"{{ entry[1] }}"</td>
            // </tr>

            tableEl = (
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

        // const [count, setCount] = useState("pos1");

        return (
            <div id="similar" className="col-md-6">
                <div className="box">
                    <div
                        className={`snipper spin ${waiting ? "" : "hide"}`}
                    ></div>
                    <h2>Word Analogies</h2>
                    <p>Find the most similar words with an operation</p>
                    <div className="container">
                        <div className="row">
                            <div className="col-6 first-col">
                                <input
                                    type="text"
                                    name="input_pos1"
                                    placeholder="POSITIVE"
                                    onChange={this.handleChange}
                                    value={this.state.input_pos1}
                                />
                            </div>
                            <div className="col-6">
                                <input
                                    type="text"
                                    name="input_neg1"
                                    placeholder="NEGATIVE"
                                    onChange={this.handleChange}
                                    value={this.state.input_neg1}
                                />
                            </div>
                        </div>
                        <div className="row">
                            <div className="col-6 first-col">
                                <input
                                    type="text"
                                    name="input_pos2"
                                    placeholder="POSITIVE"
                                    onChange={this.handleChange}
                                    value={this.state.input_pos2}
                                />
                            </div>
                            <div className="col-6">
                                <input
                                    type="text"
                                    name="input_neg2"
                                    placeholder="NEGATIVE"
                                    onChange={this.handleChange}
                                    value={this.state.input_neg2}
                                />
                            </div>
                        </div>
                        <div className="row">
                            <div className="col-6 first-col">
                                <input
                                    type="text"
                                    name="input_pos3"
                                    placeholder="POSITIVE"
                                    onChange={this.handleChange}
                                    value={this.state.input_pos3}
                                />
                            </div>
                            <div className="col-6">
                                <input
                                    type="text"
                                    name="input_neg3"
                                    placeholder="NEGATIVE"
                                    onChange={this.handleChange}
                                    value={this.state.input_neg3}
                                />
                            </div>
                        </div>
                        <div className="row">
                            <button
                                className="button"
                                disabled={waiting || !ready}
                                onClick={this.handleClick}
                            >
                                {ready ? "Query" : "loading"}
                            </button>
                        </div>
                    </div>

                    {tableEl}
                    {errorEl}

                    <p className="small">
                        Examples:{" "}
                        <a onClick={this.ex_queen} href="#">
                            King - Man + Woman
                        </a>
                        ,{" "}
                        <a onClick={this.ex_cold} href="#">
                            Hot - Summer + Winter
                        </a>
                        ,{" "}
                        <a onClick={this.ex_niece} href="#">
                            Girl - Boy + Nephew
                        </a>
                        ,{" "}
                        <a onClick={this.ex_madrid} href="#">
                            France + Italy + Spain - Paris - Rome
                        </a>
                        ,{" "}
                        <a onClick={this.ex_unicorn} href="#">
                            Mythical creature + horse + magical
                        </a>
                        .
                    </p>
                </div>
            </div>
        );
    }
}

export default Analogy;
