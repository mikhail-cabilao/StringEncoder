import { useState } from 'react';
import { HubConnectionBuilder, LogLevel } from '@microsoft/signalr';
import { EncodeForm } from './EncodeForm';

export const Encode = () => {
    const [display, setDisplay] = useState("");
    const [connection, setConnection] = useState();

    const initialize = async () => {
        try {
            const connection = new HubConnectionBuilder()
                .withUrl("https://localhost:44330/encode")
                .configureLogging(LogLevel.Information)
                .build();

            connection.on("InitReceiver", (isStart) => {
                if (isStart) setConnection(connection);
            });

            connection.on("EncodeReceiver", (text) => {
                setDisplay(str => str + text);
                console.log(text);
            });

            await connection.start();
            await connection.invoke("Initialize");

            connection.onclose(e => {
                setDisplay("");
                setConnection();
            });
        } catch (e) {
            console.log(e);
        }
    };

    const encodeString = async (input) => {
        try {
            if (connection) await connection.invoke("EncodeString", input);
        } catch (e) {
            console.log(e);
        }
    }

    const cancel = async () => {
        try {
            if (connection) await connection.stop();
        } catch (e) {
            console.log(e);
        }
    }

    return <EncodeForm
        display={display}
        cancel={cancel}
        initialize={initialize}
        connection={connection}
        encodeString={encodeString}
    />
}

