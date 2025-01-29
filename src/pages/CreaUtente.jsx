import {Form} from "react-bootstrap";
import {nanoid} from "nanoid";
import {useState} from "react";

export default function CreaUtente() {
    const [user, setuser] = useState({});

    function handleChange(prop, value) {
        let _user = {...user}
        _user[prop] = value;
        setuser(_user);
    }

    return (<Form>
        <h1>Creazione utente</h1>
        <h2>Dati Personali</h2>
        <Form.Group className="mb-3" controlId="email">
            <Form.Label>Email address</Form.Label>
            <Form.Control value={user.email} onChange={(e) => handleChange(e.target.name,e.target.value)} type="email" name="email" placeholder="jhon@jhon.it"/>
        </Form.Group>
        <Form.Group className="mb-3" controlId="username">
            <Form.Label>Username</Form.Label>
            <Form.Control value={user.username} onChange={(e) => handleChange(e.target.name,e.target.value)} type="text" name="username" placeholder="Jhon" />
        </Form.Group>
        <Form.Group className="mb-3" controlId="name">
            <Form.Label column>Name</Form.Label>
            <Form.Control value={user.name} onChange={(e) => handleChange(e.target.name,e.target.value)} type="text" name="name" placeholder="Jhon" />
        </Form.Group>
        <Form.Group className="mb-3" controlId="phone">
            <Form.Label column>Phone</Form.Label>
            <Form.Control value={user.phone} onChange={(e) => handleChange(e.target.name,e.target.value)} type="tel" name="phone" placeholder="Jhon" />
        </Form.Group>
        <h2>Indirizzo</h2>
        <Form.Group className="mb-3" controlId="company">
            <Form.Label >Company</Form.Label>
            <Form.Control value={user.phone} onChange={(e) => handleChange(e.target.name,e.target.value)} type="tel" name="phone" placeholder="Jhon" />
        </Form.Group>
    </Form>)
}