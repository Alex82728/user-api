import { useAtom } from "jotai";
import { favouritesAtom } from "@/store";
import { Row, Col, Container } from "react-bootstrap";
import ArtworkCard from "@/components/ArtworkCard"; // Assuming you have an ArtworkCard component

export default function Favourites() {
  const [favouritesList] = useAtom(favouritesAtom);

  return (
    <Container>
      <h2 className="my-4">Favourite Artworks</h2>
      {favouritesList.length === 0 ? (
        <p>Nothing Here. Try adding some new artwork to the list.</p>
      ) : (
        <Row className="gy-4">
          {favouritesList.map((objectID) => (
            <Col key={objectID} xs={12} md={6} lg={4}>
              <ArtworkCard objectID={objectID} />
            </Col>
          ))}
        </Row>
      )}
    </Container>
  );
}
