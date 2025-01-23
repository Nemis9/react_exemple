import {Button, Form} from "react-bootstrap";
import {useEffect, useState} from "react";
import {nanoid} from "nanoid";

export default function FormFilter({searchUsers, companies}) {

    const defaultFilter = {email:"",username:"",company:"",name:""}

    const [filters, setFilters] = useState(defaultFilter);

    useEffect(() => {
        searchUsers(filters);
    },[filters]);

    function handleResetFilter() {
        setFilters(defaultFilter);
    }
    function handleChange(prop, value) {
        let _filters = {...filters}
        _filters[prop] = value;
        setFilters(_filters);
    }

    return (
        <Form>
            <Form.Group className="mb-3" controlId="email">
                <Form.Label>Email address</Form.Label>
                <Form.Control value={filters.email} onChange={(e) => handleChange(e.target.name,e.target.value)} type="email" name="email" placeholder="jhon@jhon.it"/>
            </Form.Group>
            <Form.Group className="mb-3" controlId="username">
                <Form.Label>Username</Form.Label>
                <Form.Control value={filters.username} onChange={(e) => handleChange(e.target.name,e.target.value)} type="text" name="username" placeholder="Jhon" />
            </Form.Group>
            <Form.Group className="mb-3" controlId="name">
                <Form.Label column>Name</Form.Label>
                <Form.Control value={filters.name} onChange={(e) => handleChange(e.target.name,e.target.value)} type="text" name="name" placeholder="Jhon" />
            </Form.Group>
            <Form.Group className="mb-3" controlId="company">
                <Form.Label >Company</Form.Label>
                <Form.Select value={filters.company} onChange={(e) => handleChange(e.target.name,e.target.value)} aria-label="Default select example" name="company">
                    <option value="">Open this select menu</option>
                    {companies.map(company => (
                        <option key={nanoid()} value={company}>{company}</option>
                    ))}
                </Form.Select>
            </Form.Group>
            <Button variant="primary" type="button" onClick={() => handleResetFilter()}>
                Reset
            </Button>
        </Form>
    )
}