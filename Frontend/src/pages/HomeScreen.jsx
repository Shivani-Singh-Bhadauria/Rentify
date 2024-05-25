import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getProperties } from "../redux/property/propertyAction";
import { Grid, Card, CardContent, Typography, Container, Button, CircularProgress } from "@mui/material";
import { Link } from "react-router-dom";
import BACKENDURL from "../config";

const HomeScreen = () => {
  const dispatch = useDispatch();
  const properties = useSelector((state) => state.property.properties);
  const [currentPage, setCurrentPage] = useState(1);
  const propertiesPerPage = 6;

  useEffect(() => {
    dispatch(getProperties());
  }, [dispatch]);

  // Calculate the current properties to display
  const indexOfLastProperty = currentPage * propertiesPerPage;
  const indexOfFirstProperty = indexOfLastProperty - propertiesPerPage;
  const currentProperties = properties.slice(indexOfFirstProperty, indexOfLastProperty);

  const handleNextPage = () => {
    if (currentPage < Math.ceil(properties.length / propertiesPerPage)) {
      setCurrentPage(currentPage + 1);
    }
  };

  const handlePreviousPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  return (
    <Container style={{ marginTop: "30px" }}>
      <Grid container justifyContent='center' spacing={4}>
        {currentProperties.length ? (
          currentProperties.map((property) => (
            <Grid item xs={12} md={4} sm={6} key={property._id}>
              <Link to={`/property/${property._id}`} style={{ textDecoration: "none" }}>
                <Card style={{ cursor: "pointer", maxWidth: "100%" }}>
                  <img
                    src={`${BACKENDURL}/${property.images.replace(/\\/g, "/")}`}
                    alt={property.title}
                    style={{ height: "200px", width: "100%", objectFit: "cover" }}
                  />
                  <CardContent>
                    <Typography variant="h6" component="h2" gutterBottom>{property.title}</Typography>
                    <Typography variant="body2" color="textSecondary" component="p" style={{ minHeight: "70px" }}>{property.description}</Typography>
                    <Typography variant="subtitle1" component="p">{`Price: ${property.price}`}</Typography>
                  </CardContent>
                </Card>
              </Link>
            </Grid>
          ))
        ) : (
          <Typography variant="h6" mt='30px'>Properties Not Found</Typography>
        )}
      </Grid>
      {properties.length > propertiesPerPage ? (
        <div style={{ display: "flex", justifyContent: "center", marginTop: "20px" }}>
          <Button variant="contained" color="primary" onClick={handlePreviousPage} disabled={currentPage === 1}>
            Previous
          </Button>
          <Typography variant="h6" style={{ margin: "0 20px" }}>{`Page ${currentPage}`}</Typography>
          <Button
            variant="contained"
            color="primary"
            onClick={handleNextPage}
            disabled={currentPage >= Math.ceil(properties.length / propertiesPerPage)}
          >
            Next
          </Button>
        </div>
      ) : null}
    </Container>
  );
};

export default HomeScreen;
