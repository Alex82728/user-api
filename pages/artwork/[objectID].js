import { useRouter } from 'next/router';
import { Row, Col } from 'react-bootstrap';
import ArtworkCardDetail from '@/components/ArtworkCardDetail';

export default function ArtworkById() {
  const { query } = useRouter();
  const { objectID } = query;

  return (
    <Row>
      <Col>
        {objectID && <ArtworkCardDetail objectID={objectID} />}
      </Col>
    </Row>
  );
}
