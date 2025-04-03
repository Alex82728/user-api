import { useState } from "react";
import { Navbar, Nav, Form, FormControl, Button, NavDropdown } from "react-bootstrap";
import { useRouter } from "next/router";
import { useForm } from "react-hook-form";
import Link from "next/link";
import { useAtom } from "jotai";
import { searchHistoryAtom } from "@/store";

export default function MainNav() {
  const router = useRouter();
  const { register, handleSubmit } = useForm();
  const [searchHistory, setSearchHistory] = useAtom(searchHistoryAtom);
  const [isExpanded, setIsExpanded] = useState(false);

  const submitForm = (data) => {
    if (!data.search.trim()) return;

    const queryString = `title=true&q=${encodeURIComponent(data.search)}`;
    setSearchHistory((current) => [...current, queryString]);
    router.push(`/artwork?${queryString}`);
    setIsExpanded(false);
  };

  const handleHistoryClick = (query) => {
    router.push(`/artwork?${query}`);
    setIsExpanded(false);
  };

  return (
    <Navbar expand="lg" bg="dark" variant="dark" expanded={isExpanded}>
      <Navbar.Brand as={Link} href="/">Met Museum</Navbar.Brand>
      <Navbar.Toggle onClick={() => setIsExpanded(!isExpanded)} />
      <Navbar.Collapse>
        <Nav className="me-auto">
          <Nav.Link as={Link} href="/" active={router.pathname === "/"} onClick={() => setIsExpanded(false)}>
            Home
          </Nav.Link>
          <Nav.Link as={Link} href="/search" active={router.pathname === "/search"} onClick={() => setIsExpanded(false)}>
            Advanced Search
          </Nav.Link>
        </Nav>
        
        <Form className="d-flex" onSubmit={handleSubmit(submitForm)}>
          <FormControl type="text" placeholder="Search..." {...register("search")} className="me-2" />
          <Button type="submit" variant="outline-light">Search</Button>
        </Form>

        {/* User Dropdown */}
        <Nav className="ms-3">
          <NavDropdown title="User Name" id="user-dropdown">
            <NavDropdown.Item as={Link} href="/favourites" active={router.pathname === "/favourites"} onClick={() => setIsExpanded(false)}>
              Favourites
            </NavDropdown.Item>
            <NavDropdown.Item as={Link} href="/history" active={router.pathname === "/history"} onClick={() => setIsExpanded(false)}>
              Search History
            </NavDropdown.Item>
            <NavDropdown.Divider />
            <NavDropdown.Header>Recent Searches</NavDropdown.Header>
            {searchHistory.length > 0 ? (
              searchHistory.slice(-5).reverse().map((query, index) => {
                const params = new URLSearchParams(query);
                return (
                  <NavDropdown.Item 
                    key={index} 
                    onClick={() => handleHistoryClick(query)}
                    active={router.asPath.includes(query)} // Highlight active search
                  >
                    {params.get("q") || "Unknown Search"}
                  </NavDropdown.Item>
                );
              })
            ) : (
              <NavDropdown.Item disabled>No recent searches</NavDropdown.Item>
            )}
          </NavDropdown>
        </Nav>
      </Navbar.Collapse>
    </Navbar>
  );
}
