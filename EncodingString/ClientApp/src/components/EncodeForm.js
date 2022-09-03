import { useState, useEffect } from 'react';
import { Form, Button } from 'react-bootstrap';

export const EncodeForm = ({
    display,
    cancel,
    initialize,
    connection,
    encodeString
}) => {
    const [input, setInput] = useState("");
    const [toggleSubmit, setToggleSubmit] = useState(false);

    const buttonOnSubmit = (e) => {
        e.preventDefault();
        if (!toggleSubmit) {
            setToggleSubmit(true);
            initialize();
        }
        else {
            setToggleSubmit(false);
            setInput(display);
            cancel();
        }
    }

    useEffect(() => {
        encodeString(input);
    }, [connection])

    return (
        <Form className='form' onSubmit={buttonOnSubmit} >
            <div className="p-5">
                <Form.Group className="mb-2">
                    {!toggleSubmit ? <Form.Control placeholder="text" onChange={e => setInput(e.target.value)} value={input} />
                                   : <Form.Control placeholder="text" disabled={toggleSubmit} value={display} />}
                </Form.Group>
                <Button {...!toggleSubmit ? { variant: "dark" } : { variant: "outline-dark" }} type="submit">{!toggleSubmit ? "Encode" : "Cancel"}</Button>
            </div>
        </Form>
    );
}