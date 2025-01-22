import {Card} from "react-bootstrap";
import {nanoid} from "nanoid"
export default function CardUser({user}) {
    return (
        <Card key={nanoid()}>
            <Card.Body key={nanoid()}>
                <Card.Title key={nanoid()}>User n° {user.id}</Card.Title>
                <Card.Text key={nanoid()}>Name: {user.name}</Card.Text>
                <Card.Text key={nanoid()}>Username: {user.username}</Card.Text>
                <Card.Text key={nanoid()}>Email: {user.email}</Card.Text>
                <Card.Text key={nanoid()}>Company: {user.company.name}</Card.Text>
            </Card.Body>
        </Card>
    )
}