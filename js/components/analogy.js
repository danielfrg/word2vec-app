import React from "react";

export default function Analogy({ apiStatus, client }) {
    const [waiting, setWaiting] = React.useState(false);
    const [result, setResult] = React.useState("");

    const testError = {
        error_type: "TestError",
        message: "Test message",
        stacktrace: "From ... \nmore code",
    };
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

    let content;
    if (error) {
        content = (
            <div className="mx-auto max-w-screen-md text-primary font-light">
                <p>
                    {error.error_type}: {error.message}
                </p>
                <p>{error.stacktrace}</p>
            </div>
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
        <div className="w-full h-full bg-orange-light">
            <div className="p-4 grid gap-2 grid-flow-row justify-evenly">
                <div>
                    <h2 className="font-comic text-primary text-3xl text-center">
                        Word Analogies
                    </h2>
                    <p className="text-center text-primary font-light">
                        Find the most similar words with an operation
                    </p>
                </div>

                <div className="grid gap-2 grid-cols-2 font-sans">
                    <input
                        type="text"
                        name="input_pos1"
                        placeholder="POSITIVE"
                        value={inputPos1}
                        onChange={handleChange}
                        className="p-2"
                    />
                    <input
                        type="text"
                        name="input_neg1"
                        placeholder="NEGATIVE"
                        value={inputNeg1}
                        onChange={handleChange}
                        className="p-2"
                    />
                    <input
                        type="text"
                        name="input_pos2"
                        placeholder="POSITIVE"
                        value={inputPos2}
                        onChange={handleChange}
                        className="p-2"
                    />
                    <input
                        type="text"
                        name="input_neg2"
                        placeholder="NEGATIVE"
                        value={inputNeg2}
                        onChange={handleChange}
                        className="p-2"
                    />
                    <input
                        type="text"
                        name="input_pos3"
                        placeholder="POSITIVE"
                        value={inputPos3}
                        onChange={handleChange}
                        className="p-2"
                    />
                    <input
                        type="text"
                        name="input_neg3"
                        placeholder="NEGATIVE"
                        value={inputNeg3}
                        onChange={handleChange}
                        className="p-2"
                    />
                </div>

                <div className="">
                    <button
                        disabled={waiting || !ready}
                        onClick={handleClick}
                        className="w-full h-10 border-2 border-primary text-primary font-comic tracking-widest hover:bg-primary hover:text-white"
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
                            onClick={ex_queen}
                            href="#"
                        >
                            King - Man + Woman
                        </a>
                        ,{" "}
                        <a
                            className="underline hover:text-white"
                            onClick={ex_cold}
                            href="#"
                        >
                            Hot - Summer + Winter
                        </a>
                        ,{" "}
                        <a
                            className="underline hover:text-white"
                            onClick={ex_niece}
                            href="#"
                        >
                            Girl - Boy + Nephew
                        </a>
                        ,{" "}
                        <a
                            className="underline hover:text-white"
                            onClick={ex_madrid}
                            href="#"
                        >
                            France + Italy + Spain - Paris - Rome
                        </a>
                        ,{" "}
                        <a
                            className="underline hover:text-white"
                            onClick={ex_unicorn}
                            href="#"
                        >
                            Mythical creature + horse + magical
                        </a>
                        .
                    </p>
                </div>
            </div>
        </div>
    );
}
