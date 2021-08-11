import React, { Fragment } from "react";
import clsx from "clsx";

import { makeStyles } from "@material-ui/core/styles";
import { Grid } from "@material-ui/core";
import CircularProgress from "@material-ui/core/CircularProgress";

const useStyles = makeStyles((theme) => ({
    box: {
        backgroundColor: "#fc754d",
    },
}));

export default function Distance({ apiStatus, client }) {
    const classes = useStyles();
    const [waiting, setWaiting] = React.useState(false);
    const [result, setResult] = React.useState("");
    const [error, setError] = React.useState("");
    const [input, setInput] = React.useState("");

    const handleChange = (e) => {
        setInput(e.target.value);
    };

    const handleClick = (e) => {
        if (input) {
            setWaiting(true);
            setResult("");
            setError("");

            client.similar(input).then((response) => {
                if (response.error) {
                    setWaiting(false);
                    setError(response.error);
                } else {
                    setWaiting(false);
                    setResult(response.result);
                }
            });
        }
    };

    const ex_france = (e) => {
        e.preventDefault();
        setInput("france");
    };
    const ex_san_francisco = (e) => {
        e.preventDefault();
        setInput("san_francisco");
    };
    const ex_apple = (e) => {
        e.preventDefault();
        setInput("apple");
    };
    const ex_dog = (e) => {
        e.preventDefault();
        setInput("dog");
    };

    let ready = false;
    if (apiStatus == "ready") {
        ready = true;
    }

    let content = "";
    if (error) {
        content = (
            <Fragment>
                <p className="error">
                    {error.error_type}: {error.message}
                </p>
                <p className="error">{error.stacktrace}</p>
            </Fragment>
        );
    }

    if (result) {
        let rows = result.map((result, index) => (
            <tr key={index}>
                <td className="word">{result[0]}</td>
                <td className="distance">{result[1]}</td>
            </tr>
        ));

        content = (
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
        <Grid container className={clsx("box")} spacing={2}>
            <Grid container direction="row" spacing={5} justifyContent="center">
                <Grid item>
                    <h2>Top N similar</h2>
                </Grid>
                {/* <Grid item>
                    {waiting ? <CircularProgress color="inherit" /> : null}
                </Grid> */}
            </Grid>
            <Grid item>
                <p>Find the most similar words</p>
            </Grid>
            <Grid container spacing={2}>
                <Grid container className="inputs" direction="row" spacing={2}>
                    <Grid item xs={6}>
                        <input
                            type="text"
                            placeholder="WORD"
                            onChange={handleChange}
                            value={input}
                        />
                    </Grid>
                    <Grid item xs={6}>
                        <button
                            className="button"
                            disabled={waiting || !ready}
                            onClick={handleClick}
                        >
                            {ready
                                ? waiting
                                    ? "waiting"
                                    : "query"
                                : "loading"}
                        </button>
                    </Grid>
                </Grid>
            </Grid>

            {content}

            <Grid item>
                <p className="small">
                    Examples:{" "}
                    <a onClick={ex_france} href="#">
                        France
                    </a>
                    ,{" "}
                    <a onClick={ex_san_francisco} href="#">
                        San Francisco
                    </a>
                    ,{" "}
                    <a onClick={ex_apple} href="#">
                        Apple
                    </a>
                    ,{" "}
                    <a onClick={ex_dog} href="#">
                        Dog
                    </a>
                    .
                </p>
            </Grid>
        </Grid>
    );
}
