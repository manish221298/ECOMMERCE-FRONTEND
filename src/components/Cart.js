import { CartState } from "../context/Context";
import React, { useState, useEffect } from "react";
import { ListGroup, Row, Col, Button, Form } from "react-bootstrap";
import { AiFillDelete } from "react-icons/ai";
import Rating from "./Rating";

const Cart = () => {
  const {
    state: { cart },
    dispatch,
  } = CartState();
  const [totalPrice, setTotalPrice] = useState(0);
  const [totalItem, setTotalItem] = useState(0);

  useEffect(() => {
    setTotalPrice(
      cart.reduce((acc, curr) => acc + Number(curr.price) * curr.qty, 0)
    );
    setTotalItem(cart.reduce((acc, curr) => acc + Number(curr.qty), 0));
  }, [cart]);

  console.log("cart data in page", totalItem);

  return (
    <div className="home">
      <div className="productContainer">
        <ListGroup style={{ width: "73%" }} className="">
          {cart?.map((prod) => {
            return (
              <Row style={{ margin: "10px" }}>
                <Col md={2}>
                  <img className="cartItemImg" src={prod.image} />
                </Col>
                <Col md={2}>{prod.name}</Col>
                <Col md={2}>₹ {prod.price}</Col>
                <Col md={2}>
                  <Rating rating={prod.ratings} />
                </Col>
                <Col md={2}>
                  <Form.Select
                    size="lg"
                    className="w-100"
                    style={{height: "70%", borderRadius: "7%"}}
                    value={ prod.qty}
                    onChange={(e) => {
                      dispatch({
                        type: "CHANGE_ITEM_QTY",
                        payload: { id: prod.id, qty: e.target.value },
                      });
                    }}
                  >
                    {/* <option>Select Qty </option> */}
                    {[...Array(prod.inStock).keys()].map((x) => {
                      return <option key={x + 1}>{x + 1}</option>;
                    })}
                  </Form.Select>
                </Col>
                <Col>
                  <Button
                    onClick={() => {
                      dispatch({ type: "REMOVE_FROM_CART", payload: prod });
                    }}
                  >
                    <AiFillDelete fontSize="20px" />
                  </Button>
                </Col>
              </Row>
            );
          })}
        </ListGroup>
      </div>

      <div className="filters summary">
        <span>SubTotal:- {totalItem} items</span>
        <span>Total ₹: {totalPrice}</span>
      </div>
    </div>
  );
};

export default Cart;
