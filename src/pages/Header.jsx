import MyNavbar from "../components/MyNavbar";
import {Row} from "react-bootstrap";


export default function Header(){
    return (
        <Row>
            <header>
                <h1>Non so come chiamarlo</h1>
                <MyNavbar/>
            </header>
        </Row>
    )
}