import { useAtom } from "jotai";
import { useEffect, useState } from "react";
import { Card, Button } from "react-bootstrap";
import useSWR from "swr";
import { favouritesAtom } from "@/store";
import Error from "next/error";

const fetcher = (url) => fetch(url).then((res) => res.json());

export default function ArtworkCardDetail({ objectID }) {
  const { data, error } = useSWR(
    objectID ? `https://collectionapi.metmuseum.org/public/collection/v1/objects/${objectID}` : null,
    fetcher
  );

  const [favouritesList, setFavouritesList] = useAtom(favouritesAtom);
  const [showAdded, setShowAdded] = useState(false);

  // Ensure state updates if favourites change externally
  useEffect(() => {
    setShowAdded(favouritesList.includes(objectID));
  }, [favouritesList, objectID]);

  function favouritesClicked() {
    setFavouritesList((current) =>
      showAdded ? current.filter((fav) => fav !== objectID) : [...current, objectID]
    );
    setShowAdded(!showAdded);
  }

  if (error) return <Error statusCode={404} />;
  if (!data) return null;

  const { primaryImage, title, artistDisplayName, dimensions } = data;

  return (
    <Card>
      {primaryImage && <Card.Img variant="top" src={primaryImage} alt={title || "No Title"} />}
      <Card.Body>
        <Card.Title>{title || "No Title Available"}</Card.Title>
        <Card.Text>
          <strong>Artist:</strong> {artistDisplayName || "Unknown"}
          <br />
          <strong>Dimensions:</strong> {dimensions || "N/A"}
        </Card.Text>
        <Button variant={showAdded ? "primary" : "outline-primary"} onClick={favouritesClicked}>
          {showAdded ? "+ Favourite (added)" : "+ Favourite"}
        </Button>
      </Card.Body>
    </Card>
  );
}
