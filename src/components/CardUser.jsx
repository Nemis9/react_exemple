import {Card} from "react-bootstrap";
import {nanoid} from "nanoid"
export default function CardUser(props) {
    return (
        <Card key={nanoid()} style={{width: '18rem'}}>
            <Card.Body key={nanoid()}>
                <Card.Title key={nanoid()}>User n° {props.user.id}</Card.Title>
                <Card.Text key={nanoid()}>Name: {props.user.name}</Card.Text>
                <Card.Text key={nanoid()}>Username: {props.user.username}</Card.Text>
                <Card.Text key={nanoid()}>Email: {props.user.email}</Card.Text>
                <Card.Text key={nanoid()}>Company: {props.user.company.name}</Card.Text>
            </Card.Body>
        </Card>
    )
}