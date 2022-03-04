import {Box, ChakraProvider, CSSReset} from '@chakra-ui/react'
import NavBar from "../components/NavBar";

function MyApp({Component, pageProps}) {
    return (
        <ChakraProvider>
            <CSSReset/>
            <NavBar/>
            <Box p={4}>
                <Component {...pageProps} />
            </Box>
        </ChakraProvider>
    )
}

export default MyApp;
