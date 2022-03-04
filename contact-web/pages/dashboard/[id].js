import React from 'react';
import {useRouter} from "next/router";
import axios from "../../utils/axios";
import {Box, Button, Link, Spinner} from "@chakra-ui/react";
import {ArrowBackIcon, ExternalLinkIcon, PhoneIcon} from "@chakra-ui/icons";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";

dayjs.extend(relativeTime);

export default function getMessage() {
    const router = useRouter();
    const {id} = router.query;
    const [message, setMessage] = React.useState({});
    const [isLoading, setIsLoading] = React.useState(true);
    React.useEffect(() => {
        if (id) {
            axios.get(`/messages/${id}`)
                .then(({data}) => {
                    if (data.status === 'success') {
                        setMessage(data.data);
                    }
                    setIsLoading(false);
                })
                .catch(err => {
                    console.log(err);
                });
        }
    }, [id]);

    if (isLoading) {
        return <Spinner/>
    }

    return (
        <div>
            <Button onClick={() => router.back()}>
                <ArrowBackIcon/>
            </Button>
            <Box p={4}>
                <h1>{`${message.firstName} ${message.lastName}`}</h1>
                <Link href={`mailto:${message.email}`} isExternal>{message.email}<ExternalLinkIcon mx='2px'/></Link>
                <p>{message.phone}</p>
                <p>{dayjs(message.createdAt).fromNow()}</p>
                <br/>
                <p>Mensaje:</p>
                <p>{message.message}</p>
            </Box>
        </div>
    );
}