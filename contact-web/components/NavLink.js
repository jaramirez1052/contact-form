import {Link as CLink, useColorModeValue} from "@chakra-ui/react";
import Link from "next/link";
import {useRouter} from "next/router";

export default function NavLink({children, href}) {
    const router = useRouter();
    return (
        <Link href={href} passHref>
            <CLink
                px={2}
                py={1}
                rounded={'md'}
                style={{
                    backgroundColor: router.pathname === href ? '#319795' : undefined,
                    color: router.pathname === href ? '#fff' : undefined
                }}
                _hover={{
                    textDecoration: 'none',
                    bg: useColorModeValue('gray.200', 'gray.700'),
                }}>
                {children}
            </CLink>
        </Link>
    )
};
