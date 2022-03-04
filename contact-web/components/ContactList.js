import React from 'react';
import axios from "../utils/axios";
import {Link, Spinner, Table, Tbody, Td, Th, Thead, Tr, useToast} from "@chakra-ui/react";
import socketio from "socket.io-client";
import NextLink from "next/link";

function ContactList() {
    const [isLoading, setIsLoading] = React.useState(true);
    const [contacts, setContacts] = React.useState([]);
    const toast = useToast()

    React.useEffect(() => {
        axios.get('/messages').then(({data}) => {
            if (data.status === 'success') {
                setContacts(data.data);
            }
            setIsLoading(false);
        }).catch(err => {
            console.log(err);
        });
        const io = socketio(process.env.NEXT_PUBLIC_SOCKET_URL);
        io.on('new-message', (newMessage) => {
            setContacts((prevValue) => [
                newMessage,
                ...prevValue,
            ]);
            toast({
                title: 'New Message',
                status: 'success',
                duration: 9000,
                isClosable: true,
            });
        });
    }, []);
    if (isLoading) {
        return <Spinner/>;
    }

    return (
        <Table variant='simple'>
            <Thead>
                <Tr>
                    <Th>Name</Th>
                    <Th>Email</Th>
                </Tr>
            </Thead>
            <Tbody>
                {contacts && contacts.map(item => (
                    <Tr key={item.id}>
                        <Td>
                            <NextLink href={`/dashboard/${item.id}`} passHref>
                                <Link color='teal.500'>
                                    {`${item.firstName} ${item.lastName}`}
                                </Link>
                            </NextLink>
                        </Td>
                        <Td>{item.email}</Td>
                    </Tr>
                ))}
            </Tbody>
        </Table>
    );
}

export default ContactList;