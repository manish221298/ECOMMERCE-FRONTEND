import React, { useState, useEffect } from "react";
import { Button, Container, Form } from "react-bootstrap";
import { CartState } from "../context/Context";

const UploadImages = () => {
  const [images, setImages] = useState("");

  const handleImages = (e) => {
    const file = e.target.files[0];
    const img = URL.createObjectURL(file);
    setImages(img);
  };

  const {
    state: { data, products },
    dispatch,
  } = CartState();

  console.log("data array for image", data, products);

  return (
    <Container>
      <Form.Group controlId="formFile" className="mt-5">
        <Form.Label>Upload Images</Form.Label>
        <Form.Control type="file" onChange={handleImages} />
        <Button
          onClick={() => {
            dispatch({
              type: "UPLOAD_IMAGE",
              payload: { image: images, name: "image_name" },
            });
          }}
        >
          Upload Image
        </Button>
      </Form.Group>
      <div>
        {data?.map((image) => {
          return <img src={image.image} />;
        })}
      </div>
    </Container>
  );
};

export default UploadImages;
