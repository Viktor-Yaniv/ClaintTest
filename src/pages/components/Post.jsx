import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import { useLocation } from "react-router-dom";


function Post(props) {

  const { state } = useLocation();
    const post = state.some;
  return (
    <Card style={{ width: '18rem' }}>
      <Card.Img variant="top" src={props.image} />
      <Card.Body>
        <Card.Title>{props.name}</Card.Title>
        <Card.Text>
          {props.location}
        </Card.Text>
        <Card.Text>
          {props.date}
        </Card.Text>
        <Button variant="primary">לחץ לפרטים</Button>
      </Card.Body>
    </Card>
  );
}

export default Post;