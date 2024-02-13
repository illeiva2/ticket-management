import { Jumbotron, Container } from "react-bootstrap";
import App from "../App";
const Main = () => {
  return (
    <Jumbotron>
      <Container>
        <h1>Ticket Management</h1>
        <App />
      </Container>
    </Jumbotron>
  );
};

export default Main;
