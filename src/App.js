import './App.css';
import {Container} from "react-bootstrap";
import 'bootstrap/dist/css/bootstrap.min.css';
import Header from "./pages/Header";
import Main from "./pages/Main";
import { Route, Routes} from "react-router";
import UserPage from "./pages/UserPage";
import AlbumPage from "./pages/AlbumPage";

function App() {


    return (
      <Container fluid>


                  <Header/>

                  <Routes>
                      <Route path="/" element={<Main />} />
                      <Route path="/user/:idUser" element={<UserPage/>} />
                      <Route path="/album/:idAlbum" element={<AlbumPage/>} />
                  </Routes>


      </Container>
  );
}

export default App;
