import { useState } from "react";
import { useRouter } from "next/router";
import { Form, Button, Col, Row } from "react-bootstrap";
import { useForm } from "react-hook-form";
import { useAtom } from "jotai";
import { searchHistoryAtom } from "@/store"; // Import searchHistoryAtom

export default function AdvancedSearch() {
  const { register, handleSubmit, formState: { errors } } = useForm();
  const router = useRouter();
  const [searchHistory, setSearchHistory] = useAtom(searchHistoryAtom); // Get search history

  const submitForm = (data) => {
    let queryString = "searchBy=true";

    // Append query parameters conditionally
    if (data.geoLocation) queryString += `&geoLocation=${data.geoLocation}`;
    if (data.medium) queryString += `&medium=${data.medium}`;
    if (data.isOnView) queryString += `&isOnView=${data.isOnView}`;
    if (data.isHighlight) queryString += `&isHighlight=${data.isHighlight}`;
    if (data.q) queryString += `&q=${data.q}`;

    // Save search query to history
    setSearchHistory((current) => [...current, queryString]);

    // Redirect to artwork page with the query string
    router.push(`/artwork?${queryString}`);
  };

  return (
    <div className="container">
      <h1>Advanced Search</h1>
      <Form onSubmit={handleSubmit(submitForm)}>
        <Row className="mb-3">
          <Form.Group as={Col} controlId="geoLocation">
            <Form.Label>GeoLocation</Form.Label>
            <Form.Control type="text" {...register("geoLocation")} />
          </Form.Group>
          <Form.Group as={Col} controlId="medium">
            <Form.Label>Medium</Form.Label>
            <Form.Control type="text" {...register("medium")} />
          </Form.Group>
        </Row>

        <Row className="mb-3">
          <Form.Group as={Col} controlId="isOnView">
            <Form.Label>Is On View</Form.Label>
            <Form.Control as="select" {...register("isOnView")}>
              <option value="">Any</option>
              <option value="true">True</option>
              <option value="false">False</option>
            </Form.Control>
          </Form.Group>
          <Form.Group as={Col} controlId="isHighlight">
            <Form.Label>Is Highlight</Form.Label>
            <Form.Control as="select" {...register("isHighlight")}>
              <option value="">Any</option>
              <option value="true">True</option>
              <option value="false">False</option>
            </Form.Control>
          </Form.Group>
        </Row>

        <Row className="mb-3">
          <Form.Group as={Col} controlId="q">
            <Form.Label>Search Term</Form.Label>
            <Form.Control
              type="text"
              {...register("q", { required: true })}
              className={errors.q ? "is-invalid" : ""}
            />
            {errors.q && <div className="invalid-feedback">This field is required</div>}
          </Form.Group>
        </Row>

        <Button variant="primary" type="submit">
          Search
        </Button>
      </Form>
    </div>
  );
}
