import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import Link from "next/link";
import { Navbar, Nav, NavDropdown, Form, FormControl, Button } from "react-bootstrap";
import { readToken, removeToken } from "@/lib/authenticate";

export default function MainNav() {
  const [expanded, setExpanded] = useState(false);
  const [searchField, setSearchField] = useState("");
  const [token, setToken] = useState(null);
  const router = useRouter();

  useEffect(() => {
    setToken(readToken());
  }, []);

  function logout() {
    setExpanded(false); // Collapse the menu
    removeToken();      // Remove JWT from localStorage
    router.push("/login"); // Redirect to login page
  }

  function handleSubmit(e) {
    e.preventDefault();
    setExpanded(false);
    router.push(`/artwork?title=true&q=${searchField}`);
  }

  return (
    <Navbar expanded={expanded} className="fixed-top navbar-dark bg-primary" expand="lg">
      <Navbar.Brand as={Link} href="/" onClick={() => setExpanded(false)}>
        Alexandru Zaporojan
      </Navbar.Brand>
      <Navbar.Toggle aria-controls="basic-navbar-nav" onClick={() => setExpanded(!expanded)} />
      <Navbar.Collapse id="basic-navbar-nav">
        <Nav className="me-auto">
          <Nav.Link
            as={Link}
            href="/"
            active={router.pathname === "/"}
            onClick={() => setExpanded(false)}
          >
            Home
          </Nav.Link>
          {token && (
            <Nav.Link
              as={Link}
              href="/search"
              active={router.pathname === "/search"}
              onClick={() => setExpanded(false)}
            >
              Advanced Search
            </Nav.Link>
          )}
        </Nav>

        {token ? (
          <>
            <Form className="d-flex" onSubmit={handleSubmit}>
              <FormControl
                type="text"
                placeholder="Search"
                className="me-2"
                onChange={(e) => setSearchField(e.target.value)}
              />
              <Button type="submit" variant="success">
                Search
              </Button>
            </Form>

            <Nav>
              <NavDropdown title={token.userName} id="basic-nav-dropdown">
                <NavDropdown.Item
                  as={Link}
                  href="/favourites"
                  onClick={() => setExpanded(false)}
                >
                  Favourites
                </NavDropdown.Item>
                <NavDropdown.Item
                  as={Link}
                  href="/history"
                  onClick={() => setExpanded(false)}
                >
                  Search History
                </NavDropdown.Item>
                <NavDropdown.Divider />
                <NavDropdown.Item onClick={logout}>Logout</NavDropdown.Item>
              </NavDropdown>
            </Nav>
          </>
        ) : (
          <Nav>
            <Nav.Link
              as={Link}
              href="/register"
              active={router.pathname === "/register"}
              onClick={() => setExpanded(false)}
            >
              Register
            </Nav.Link>
            <Nav.Link
              as={Link}
              href="/login"
              active={router.pathname === "/login"}
              onClick={() => setExpanded(false)}
            >
              Login
            </Nav.Link>
          </Nav>
        )}
      </Navbar.Collapse>
    </Navbar>
  );
}
