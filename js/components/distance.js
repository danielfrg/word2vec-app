import React, { Fragment } from "react";

export default function Distance({ apiStatus, client }) {
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

    let content;
    if (error) {
        content = (
            <Fragment>
                <p className="error">
                    {error.error_type}: {error.message}
                </p>
                <p className="error">{error.stacktrace}</p>
            </Fragment>
        );
    } else if (result) {
        let rows = result.map((result, index) => (
            <tr key={index}>
                <td className="word">{result[0]}</td>
                <td className="distance">{result[1]}</td>
            </tr>
        ));

        content = (
            <div>
                <table>
                    <thead>
                        <tr className="">
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
        <div className="w-full h-full bg-orange-light">
            <div className="p-4 grid gap-2 grid-flow-row justify-evenly">
                <div>
                    <h2 className="font-comic text-primary text-3xl text-center">
                        Top N similar
                    </h2>
                    <p className="text-center text-primary font-light">
                        Find the most similar words
                    </p>
                </div>

                <div className="grid gap-2 grid-cols-2 font-sans">
                    <input
                        type="text"
                        placeholder="WORD"
                        onChange={handleChange}
                        value={input}
                        className="p-2"
                    />

                    <button
                        className="border-2 border-primary text-primary font-comic tracking-widest hover:bg-primary hover:text-white"
                        disabled={waiting || !ready}
                        onClick={handleClick}
                    >
                        {ready ? (waiting ? "waiting" : "query") : "loading"}
                    </button>
                </div>

                <div className="mb-auto">{content}</div>

                <div className="">
                    <p className="small font-light text-primary text-sm">
                        Examples:{" "}
                        <a
                            className="underline hover:text-white"
                            onClick={ex_france}
                            href="#"
                        >
                            France
                        </a>
                        ,{" "}
                        <a
                            className="underline hover:text-white"
                            onClick={ex_san_francisco}
                            href="#"
                        >
                            San Francisco
                        </a>
                        ,{" "}
                        <a
                            className="underline hover:text-white"
                            onClick={ex_apple}
                            href="#"
                        >
                            Apple
                        </a>
                        ,{" "}
                        <a
                            className="underline hover:text-white"
                            onClick={ex_dog}
                            href="#"
                        >
                            Dog
                        </a>
                        .
                    </p>
                </div>
            </div>
        </div>
    );
}
