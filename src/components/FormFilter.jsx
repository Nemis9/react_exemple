import {Button, Form} from "react-bootstrap";
import {useRef} from "react";

export default function FormFilter({searchUsers, companies}) {

    const email = useRef(null)
    const username = useRef(null)
    const name = useRef(null)
    const company = useRef(null)

    function handleSubmit(event) {
        event.preventDefault()
        searchUsers({email:email.current.value,
            username:username.current.value,
            name:name.current.value,
            company:company.current.value})
    }

    return (
        <Form onSubmit={handleSubmit}>
            <Form.Group className="mb-3" controlId="email">
                <Form.Label>Email address</Form.Label>
                <Form.Control ref={email} type="email" name="email"/>
            </Form.Group>
            <Form.Group className="mb-3" controlId="username">
                <Form.Label>Username</Form.Label>
                <Form.Control ref={username} type="text" name="username" placeholder="Jhon" />
            </Form.Group>
            <Form.Group className="mb-3" controlId="name">
                <Form.Label>Name</Form.Label>
                <Form.Control ref={name} type="text" name="name" placeholder="Jhon" />
            </Form.Group>
            <Form.Group className="mb-3" controlId="company">
                <Form.Label >Company</Form.Label>
                <Form.Select ref={company} aria-label="Default select example" name="company">
                    <option value="">Open this select menu</option>
                    {companies.map(company => (
                        <option value={company}>{company}</option>
                    ))}
                </Form.Select>
            </Form.Group>
            <Button variant="primary" type="submit">
                Submit
            </Button>
        </Form>
    )
}