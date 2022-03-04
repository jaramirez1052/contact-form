import {useForm} from 'react-hook-form'
import {
    FormErrorMessage,
    FormLabel,
    FormControl,
    Input,
    Button, Textarea,
} from '@chakra-ui/react'
import axios from "../utils/axios";

export default function ContactForm() {
    const {
        handleSubmit,
        register,
        formState: {errors, isSubmitting},
    } = useForm()

    async function onSubmit(values) {
        try {
            const {data} = await axios.post('/messages', values)
            console.log(data)
        } catch (e) {
            console.error(e)
        }
    }

    return (
        <form onSubmit={handleSubmit(onSubmit)}>
            <FormControl isInvalid={errors.firstName}>
                <FormLabel htmlFor='firstName'>First name</FormLabel>
                <Input
                    id='firstName'
                    placeholder='First name'
                    {...register('firstName', {
                        required: 'This is required',
                        minLength: {value: 4, message: 'Minimum length should be 4'},
                    })}
                />
                <FormErrorMessage>
                    {errors.firstName && errors.firstName.message}
                </FormErrorMessage>
            </FormControl>
            <FormControl isInvalid={errors.lastName}>
                <FormLabel htmlFor='lastName'>Last name</FormLabel>
                <Input
                    id='lastName'
                    placeholder='Last name'
                    {...register('lastName', {
                        required: 'This is required',
                        minLength: {value: 4, message: 'Minimum length should be 4'},
                    })}
                />
                <FormErrorMessage>
                    {errors.lastName && errors.lastName.message}
                </FormErrorMessage>
            </FormControl>
            <FormControl isInvalid={errors.email}>
                <FormLabel htmlFor='email'>Email</FormLabel>
                <Input
                    id='email'
                    placeholder='Email'
                    {...register('email', {
                        required: 'This is required',
                        minLength: {value: 4, message: 'Minimum length should be 4'},
                        pattern: {
                            value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                            message: "Invalid email address",
                        }
                    })}
                />
                <FormErrorMessage>
                    {errors.email && errors.email.message}
                </FormErrorMessage>
            </FormControl>
            <FormControl isInvalid={errors.phone}>
                <FormLabel htmlFor='phone'>Phone Number</FormLabel>
                <Input
                    id='phone'
                    placeholder='Phone'
                    {...register('phone', {
                        required: 'This is required',
                        minLength: {value: 4, message: 'Minimum length should be 4'},
                        pattern: {
                            value: /^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/,
                            message: "Invalid  phone number",
                        }
                    })}
                />
                <FormErrorMessage>
                    {errors.phone && errors.phone.message}
                </FormErrorMessage>
            </FormControl>
            <FormControl isInvalid={errors.message}>
                <FormLabel htmlFor='Message'>Message</FormLabel>
                <Textarea
                    id='message'
                    placeholder='Message'
                    {...register('message', {
                        required: 'This is required',
                        minLength: {value: 8, message: 'Minimum length should be 8'},
                    })}
                />
                <FormErrorMessage>
                    {errors.message && errors.message.message}
                </FormErrorMessage>
            </FormControl>
            <Button mt={4} colorScheme='teal' isLoading={isSubmitting} type='submit'>
                Submit
            </Button>
        </form>
    )
}