import { useRouter } from "next/router";
import useSWR from "swr";
import { useState, useEffect } from "react";
import { Row, Col, Pagination, Card } from "react-bootstrap";
import ArtworkCard from "@/components/ArtworkCard";
import Error from "next/error";
import validObjectIDList from "@/public/data/validObjectIDList.json"; // Import the valid object ID list

const PER_PAGE = 12;

export default function Artwork() {
  const router = useRouter();
  let finalQuery = router.asPath.split("?")[1];

  const { data, error } = useSWR(
    finalQuery ? `https://collectionapi.metmuseum.org/public/collection/v1/search?${finalQuery}` : null
  );

  const [artworkList, setArtworkList] = useState([]);
  const [page, setPage] = useState(1);

  useEffect(() => {
    if (data?.objectIDs) {
      // Filter the search results to only include valid objectIDs
      const filteredResults = validObjectIDList.objectIDs.filter((id) =>
        data.objectIDs.includes(id)
      );

      // Convert the filtered results into paginated chunks
      const results = [];
      for (let i = 0; i < filteredResults.length; i += PER_PAGE) {
        results.push(filteredResults.slice(i, i + PER_PAGE));
      }

      setArtworkList(results);
      setPage(1); // Reset page to 1 whenever search results update
    } else {
      setArtworkList([]); // Ensure artworkList is cleared when no data
    }
  }, [data]);

  function previousPage() {
    setPage((prev) => Math.max(prev - 1, 1)); // Ensure it never goes below 1
  }

  function nextPage() {
    setPage((prev) => Math.min(prev + 1, artworkList.length)); // Ensure it never exceeds max pages
  }

  if (error) return <Error statusCode={404} />;
  if (!artworkList) return null;

  return (
    <>
      <Row className="gy-4">
        {artworkList.length > 0 ? (
          artworkList[page - 1]?.map((currentObjectID) => (
            <Col lg={3} key={currentObjectID}>
              <ArtworkCard objectID={currentObjectID} />
            </Col>
          ))
        ) : (
          <Col>
            <Card>
              <Card.Body>
                <h4>Nothing Here</h4>
                Try searching for something else.
              </Card.Body>
            </Card>
          </Col>
        )}
      </Row>

      {artworkList.length > 0 && (
        <Row className="mt-4">
          <Col>
            <Pagination>
              <Pagination.Prev onClick={previousPage} disabled={page === 1} />
              <Pagination.Item>{page}</Pagination.Item>
              <Pagination.Next onClick={nextPage} disabled={page === artworkList.length} />
            </Pagination>
          </Col>
        </Row>
      )}
    </>
  );
}
