import {Button, Form} from "react-bootstrap";
import {useState} from "react";
import {useNavigate} from "react-router";

export default function CreaUtente() {

    const navigate = useNavigate();


    const defaultUser = {id:0,name:"", email:"",username:"",phone:"",website:"",
        address:{street:"", city:"", zipcode:""},
        company:{name:"", catchPhrase:"", bs:""}}

    const [user, setuser] = useState(defaultUser);

    function handleChange(prop, value) {
        let _user = {...user}
        if(prop === "street" || prop === "suite" || prop === "city" || prop === "zipcode")
            _user.address[prop] = value;
        else if(prop === "company.name" || prop === "company.catchPhrase" || prop === "company.bs"){
            let _prop = prop.split(".");
            _user.company[_prop[1]] = value;
        }
        else
            _user[prop] = value;
        setuser(_user);
    }

    function handleReset() {
        setuser(defaultUser);
    }

    function handleCreaUtente() {
        let users = JSON.parse(localStorage.getItem("users"))
        let _user = {...user, id: (users[users.length - 1].id +1)};
        console.log(_user);
        users.push(_user);
        localStorage.setItem("users", JSON.stringify(users));
        navigate("/");
    }

    return (<Form>
        <h1>Creazione utente</h1>
        <Button variant="primary" type="button" onClick={() => handleReset()}>
            Reset
        </Button>
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
            <Form.Control value={user.phone} onChange={(e) => handleChange(e.target.name,e.target.value)} type="tel" name="phone" placeholder="123" />
        </Form.Group>
        <Form.Group className="mb-3" controlId="website">
            <Form.Label column>Website</Form.Label>
            <Form.Control value={user.website} onChange={(e) => handleChange(e.target.name,e.target.value)} type="text" name="website" placeholder="jhon.net" />
        </Form.Group>
        <h2>Indirizzo</h2>
        <Form.Group className="mb-3" controlId="street">
            <Form.Label >Street</Form.Label>
            <Form.Control value={user.address.street} onChange={(e) => handleChange(e.target.name,e.target.value)} type="text" name="street" placeholder="Kulas Light" />
        </Form.Group>
        <Form.Group className="mb-3" controlId="suite">
            <Form.Label >Suite</Form.Label>
            <Form.Control value={user.address.suite} onChange={(e) => handleChange(e.target.name,e.target.value)} type="text" name="suite" placeholder="Apt. 666" />
        </Form.Group>
        <Form.Group className="mb-3" controlId="city">
            <Form.Label >City</Form.Label>
            <Form.Control value={user.address.city} onChange={(e) => handleChange(e.target.name,e.target.value)} type="text" name="city" placeholder="Milano" />
        </Form.Group>
        <Form.Group className="mb-3" controlId="zipcode">
            <Form.Label >Zipcode</Form.Label>
            <Form.Control value={user.address.zipcode} onChange={(e) => handleChange(e.target.name,e.target.value)} type="text" name="zipcode" placeholder="123" />
        </Form.Group>

        <h2>Company</h2>
        <Form.Group className="mb-3" controlId="company.name">
            <Form.Label >Name</Form.Label>
            <Form.Control value={user.company.name} onChange={(e) => handleChange(e.target.name,e.target.value)} type="text" name="company.name" placeholder="Eustema" />
        </Form.Group>
        <Form.Group className="mb-3" controlId="company.catchPhrase">
            <Form.Label >Catch Phrase</Form.Label>
            <Form.Control value={user.company.catchPhrase} onChange={(e) => handleChange(e.target.name,e.target.value)} type="text" name="company.catchPhrase" placeholder="bho" />
        </Form.Group>
        <Form.Group className="mb-3" controlId="company.bs">
            <Form.Label >BS</Form.Label>
            <Form.Control value={user.company.bs} onChange={(e) => handleChange(e.target.name,e.target.value)} type="text" name="company.bs" placeholder="bho" />
        </Form.Group>
        <Button variant="primary" type="button" onClick={() => handleCreaUtente()}>
            Invia
        </Button>
    </Form>)
}