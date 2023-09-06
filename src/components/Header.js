import React, { useState, useEffect } from "react";
import {
  Navbar,
  Nav,
  Container,
  FormControl,
  Dropdown,
  Badge,
  Button,
} from "react-bootstrap";
import { Link, useLocation } from "react-router-dom";
import { FaShoppingCart } from "react-icons/fa";
import { CartState } from "../context/Context";
import { AiFillDelete } from "react-icons/ai";

const Header = () => {
  const {
    state: { cart },
    dispatch,
    productDispatch,
  } = CartState();

  return (
    <Navbar bg="dark" varient="light" expand="lg" style={{ height: 80 }}>
      <Container>
        <Navbar.Brand>
          <Link className="text-light" to="/">
            Shopping Cart
          </Link>
        </Navbar.Brand>
        <Navbar.Text className="search">
          <FormControl
            style={{ width: 500 }}
            type="search"
            placeholder="Search a product..."
            className="m-auto"
            aria-label="Search"
            onChange={(e) => {
              productDispatch({
                type: "FILTER_BY_SEARCH",
                payload: e.target.value
              })
            }}
          />
        </Navbar.Text>
        <Nav>
          <Dropdown>
            <Dropdown.Toggle>
              <FaShoppingCart color="white" fontSize="25px" />
              <Badge>{cart?.length}</Badge>
            </Dropdown.Toggle>
            <Dropdown.Menu style={{ minWidth: 370 }}>
              {cart.length > 0 ? (
                cart?.map((prod) => {
                  return (
                    <span className="cartItem">
                      <img className="cartItemImg" src={prod.image} />
                      <div className="cartItemDetail">
                        <span>{prod.name}</span>{" "}
                        <span>₹ {prod.price.split(".")[0]}</span>
                      </div>
                      <AiFillDelete
                        fontSize="25px"
                        style={{ cursor: "pointer" }}
                        onClick={() => [
                          dispatch({ type: "REMOVE_FROM_CART", payload: prod }),
                        ]}
                      />
                    </span>
                  );
                })
              ) : (
                <span style={{ padding: 10 }}>Cart is empty!</span>
              )}
              <Link to="/cart">
                <Button style={{ width: "95%", margin: "0 9px" }}>
                  Go to cart page
                </Button>
              </Link>
            </Dropdown.Menu>
          </Dropdown>
        </Nav>
      </Container>
    </Navbar>
  );
};

export default Header;
