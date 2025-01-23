import {Col, Row} from "react-bootstrap";
import FormFilter from "../components/FormFilter";
import {nanoid} from "nanoid";
import {useEffect, useState} from "react";
import MyCard from "../components/card/MyCard";

export default function Main(){

    const[users,setUsers] = useState([]);
    const[filteredUsers,setFilteredUsers] = useState([]);
    const[companies,setCompanies] = useState([]);

    useEffect(() => {
        getAllUsers()
    }, []);


    function getAllUsers() {
        fetch("https://jsonplaceholder.typicode.com/users")
            .then(res => res.json())
            .then(data => {
                setUsers(data)
                setFilteredUsers(data)
                setCompanies(data.map((user) => {
                    return user.company.name;
                }))
            })

    }

    function searchUsers({email="",username="", name="", company=""}={}) {
        let _users = users
        if(email !== "")
            _users = _users.filter((user) => user.email.toLowerCase().includes(email));
        if(username !== "")
            _users = _users.filter(user => user.username.toLowerCase().includes(username.toLowerCase()));
        if(name !== "")
            _users = _users.filter(user => user.name.toLowerCase().includes(name.toLowerCase()));
        if(company !== "")
            _users = _users.filter(user => user.company.name === company);
        setFilteredUsers(_users);
    }


    return (
        <>
            <Row>
                <h2>Ricerca</h2>
                <Col>
                    <FormFilter searchUsers={searchUsers} companies={companies}/>
                </Col>

            </Row>
            <Row>
                {filteredUsers.map(user => {

                    return (<Col md="4" key={nanoid()} >
                        <MyCard key={user.id} title={"User n°" + user.id} texts={["Name: "+ user.name, "Username: " + user.username, "Email: " + user.email, "Company: " + user.company.name]} urlNavigate={`/user/${user.id}`}/>
                    </Col>)
                })
                }
            </Row>
        </>

    )
}