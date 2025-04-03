import React from 'react';
import { Card, Button } from 'react-bootstrap';
import useSWR from 'swr';
import Link from 'next/link';
import Error from 'next/error';

const fetcher = (url) => fetch(url).then((res) => res.json());

const ArtworkCard = ({ objectID }) => {
  const { data, error } = useSWR(
    `https://collectionapi.metmuseum.org/public/collection/v1/objects/${objectID}`,
    fetcher
  );

  if (error) return <Error statusCode={404} />;
  if (!data) return null;

  const { primaryImageSmall, title, objectDate, classification, medium, objectID: id } = data;

  return (
    <Card style={{ width: '18rem' }}>
      <Card.Img
        variant="top"
        src={primaryImageSmall || 'https://via.placeholder.com/375x375.png?text=[+Not+Available+]'}
        alt={title || 'N/A'}
      />
      <Card.Body>
        <Card.Title>{title || 'N/A'}</Card.Title>
        <Card.Text>
          {objectDate || 'N/A'} <br />
          {classification || 'N/A'} <br />
          {medium || 'N/A'}
        </Card.Text>
        <Link href={`/artwork/${id}`} passHref>
          <Button variant="primary">{id}</Button>
        </Link>
      </Card.Body>
    </Card>
  );
};

export default ArtworkCard;
