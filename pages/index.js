


/*********************************************************************************
*  WEB422 – Assignment 5
*
*  I declare that this assignment is my own work in accordance with Seneca's
*  Academic Integrity Policy:
* 
*  https://www.senecapolytechnic.ca/about/policies/academic-integrity-policy.html
* 
*  Name: Alexandru Zaporojan Student ID: 105756233 Date: 2025/03/21
*
********************************************************************************/ 



import { Row, Col, Image, Card } from 'react-bootstrap';

export default function Home() {
  return (
    <div className="container">
      <h1>Welcome to The Met</h1>
      <Image
        src="https://upload.wikimedia.org/wikipedia/commons/3/30/Metropolitan_Museum_of_Art_%28The_Met%29_-_Central_Park%2C_NYC.jpg"
        alt="Metropolitan Museum of Art"
        fluid
        rounded
      />
      <Row className="mt-4">
        <Col md={6}>
          <Card>
            <Card.Body>
              <Card.Text>
                The Metropolitan Museum of Art of New York City, colloquially "The Met", is the largest art museum in the United States. Its collection contains over 2 million works of art, spanning 5,000 years of history.
              </Card.Text>
              <Card.Link href="https://en.wikipedia.org/wiki/Metropolitan_Museum_of_Art" target="_blank" rel="noreferrer">
                Learn more on Wikipedia
              </Card.Link>
            </Card.Body>
          </Card>
        </Col>
        <Col md={6}>
          <Card>
            <Card.Body>
              <Card.Text>
                The museum's collection includes works from ancient Egypt, classical Greece and Rome, as well as European and American paintings, sculptures, and decorative arts. Its iconic building is located in Central Park, New York City.
              </Card.Text>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </div>
  );
}
