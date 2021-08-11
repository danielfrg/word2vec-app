import React from "react";
import clsx from "clsx";

import { makeStyles } from "@material-ui/core/styles";
import { Grid } from "@material-ui/core";
import CircularProgress from "@material-ui/core/CircularProgress";

const useStyles = makeStyles((theme) => ({
    box: {
        backgroundColor: "#fc754d",
    },
}));

export default function Analogy({ apiStatus, client }) {
    const classes = useStyles();
    const [waiting, setWaiting] = React.useState(false);
    const [result, setResult] = React.useState("");
    const [error, setError] = React.useState("");
    const [inputPos1, setInputPos1] = React.useState("");
    const [inputNeg1, setInputNeg1] = React.useState("");
    const [inputPos2, setInputPos2] = React.useState("");
    const [inputNeg2, setInputNeg2] = React.useState("");
    const [inputPos3, setInputPos3] = React.useState("");
    const [inputNeg3, setInputNeg3] = React.useState("");

    const handleChange = (e) => {
        switch (e.target.name) {
            case "input_pos1":
                setInputPos1(e.target.value);
                break;
            case "input_neg1":
                setInputNeg1(e.target.value);
                break;
            case "input_pos2":
                setInputPos2(e.target.value);
                break;
            case "input_neg2":
                setInputNeg2(e.target.value);
                break;
            case "input_pos3":
                setInputPos1(e.target.value);
                break;
            case "input_neg3":
                setInputNeg3(e.target.value);
                break;
        }
    };

    const handleClick = (e) => {
        const pos = [inputPos1, inputPos2, inputPos3].filter(Boolean);
        const neg = [inputNeg1, inputNeg2, inputNeg3].filter(Boolean);

        if (pos.length > 0 || neg.length > 0) {
            setWaiting(true);
            setResult("");
            setError("");

            client.analogy(pos, neg).then((response) => {
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

    const ex_queen = (e) => {
        e.preventDefault();
        setInputPos1("king");
        setInputPos2("woman");
        setInputPos3("");
        setInputNeg1("man");
        setInputNeg2("");
        setInputNeg3("");
    };
    const ex_cold = (e) => {
        e.preventDefault();
        setInputPos1("hot");
        setInputPos2("winter");
        setInputPos3("");
        setInputNeg1("summer");
        setInputNeg2("");
        setInputNeg3("");
    };
    const ex_niece = (e) => {
        e.preventDefault();
        setInputPos1("girl");
        setInputPos2("nephew");
        setInputPos3("");
        setInputNeg1("boy");
        setInputNeg2("");
        setInputNeg3("");
    };
    const ex_madrid = (e) => {
        e.preventDefault();
        setInputPos1("france");
        setInputPos2("italy");
        setInputPos3("spain");
        setInputNeg1("paris");
        setInputNeg2("rome");
        setInputNeg3("");
    };
    const ex_unicorn = (e) => {
        e.preventDefault();
        setInputPos1("mythical_creature");
        setInputPos2("horse");
        setInputPos3("magical");
        setInputNeg1("");
        setInputNeg2("");
        setInputNeg3("");
    };

    let ready = false;
    if (apiStatus == "ready") {
        ready = true;
    }

    let errorEl = "";
    if (error) {
        errorEl = (
            <>
                <p className="error">
                    {error.error_type}: {error.message}
                </p>
                <p className="error">{error.stacktrace}</p>
            </>
        );
    }

    let table = "";
    if (result) {
        let rows = result.map((result, index) => (
            <tr key={index}>
                <td className="word">{result[0]}</td>
                <td className="distance">{result[1]}</td>
            </tr>
        ));

        table = (
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
            <Grid
                item
                container
                xs={12}
                spacing={5}
                direction="row"
                justifyContent="center"
            >
                <Grid item>
                    <h2>Word Analogies</h2>
                </Grid>
                {/* <Grid item>
                    {waiting ? <CircularProgress color="inherit" /> : null}
                </Grid> */}
            </Grid>
            <Grid item>
                <p>Find the most similar words with an operation</p>
            </Grid>
            <Grid item container xs={12} spacing={2} className="inputs">
                <Grid container className="inputs" direction="row" spacing={2}>
                    <Grid item xs={6}>
                        <input
                            type="text"
                            name="input_pos1"
                            placeholder="POSITIVE"
                            value={inputPos1}
                            onChange={handleChange}
                        />
                    </Grid>
                    <Grid item xs={6}>
                        <input
                            type="text"
                            name="input_neg1"
                            placeholder="NEGATIVE"
                            value={inputNeg1}
                            onChange={handleChange}
                        />
                    </Grid>
                    <Grid item xs={6}>
                        <input
                            type="text"
                            name="input_pos2"
                            placeholder="POSITIVE"
                            value={inputPos2}
                            onChange={handleChange}
                        />
                    </Grid>
                    <Grid item xs={6}>
                        <input
                            type="text"
                            name="input_neg2"
                            placeholder="NEGATIVE"
                            value={inputNeg2}
                            onChange={handleChange}
                        />
                    </Grid>
                    <Grid item xs={6}>
                        <input
                            type="text"
                            name="input_pos3"
                            placeholder="POSITIVE"
                            value={inputPos3}
                            onChange={handleChange}
                        />
                    </Grid>
                    <Grid item xs={6}>
                        <input
                            type="text"
                            name="input_neg3"
                            placeholder="NEGATIVE"
                            value={inputNeg3}
                            onChange={handleChange}
                        />
                    </Grid>
                </Grid>
            </Grid>

            <Grid item xs={12}>
                <button
                    className="button"
                    disabled={waiting || !ready}
                    onClick={handleClick}
                >
                    {ready ? (waiting ? "waiting" : "query") : "loading"}
                </button>
            </Grid>

            <Grid item xs={12}>
                {table}
                {errorEl}
            </Grid>

            <Grid item xs={12}>
                <p className="small">
                    Examples:{" "}
                    <a onClick={ex_queen} href="#">
                        King - Man + Woman
                    </a>
                    ,{" "}
                    <a onClick={ex_cold} href="#">
                        Hot - Summer + Winter
                    </a>
                    ,{" "}
                    <a onClick={ex_niece} href="#">
                        Girl - Boy + Nephew
                    </a>
                    ,{" "}
                    <a onClick={ex_madrid} href="#">
                        France + Italy + Spain - Paris - Rome
                    </a>
                    ,{" "}
                    <a onClick={ex_unicorn} href="#">
                        Mythical creature + horse + magical
                    </a>
                    .
                </p>
            </Grid>
        </Grid>
    );
}
