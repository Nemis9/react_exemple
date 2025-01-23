import {Card} from "react-bootstrap";
import {useNavigate} from "react-router";

export default function MyCard({title, subtitle, texts, links, urlNavigate}) {

    let navigate = useNavigate();

    return (
        <Card onClick={urlNavigate !== null ? () => navigate(urlNavigate) : null}>
        <Card.Body>
                <Card.Title>{title}</Card.Title>
                {subtitle && <Card.Subtitle className="mb-2 text-muted"> {subtitle}</Card.Subtitle>}
                {texts && texts.map(text => (<Card.Text>{text}</Card.Text>))}
                {links && links.map(link => (<Card.Text>Website: <a href={link}>{link}</a></Card.Text>))
                }
            </Card.Body>
        </Card>
    )
}