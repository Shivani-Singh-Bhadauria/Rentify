
import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { getSingleProperty, getSellerDetails } from '../../redux/property/propertyAction';
import { useParams } from 'react-router-dom';
import { Grid, Typography, Container, Button,Link } from '@mui/material';
import { styled } from '@mui/system';
import BACKENDURL from '../../config';
import {FaArrowLeft} from "react-icons/fa"

const Image = styled('img')({
  height: 'auto',
  maxWidth: '100%',
});

const SingleProperty = () => {
  const { id } = useParams();
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getSingleProperty(id));
  }, [dispatch, id]);

  const { singleProperty, seller } = useSelector((state) => state.property);

  const handleGetSellerDetails = () => {
    if (singleProperty && singleProperty.seller) {
      dispatch(getSellerDetails(singleProperty.seller));
    }
  };

  if (!singleProperty) {
    return <div>Property not found</div>;
  }

  return (
    <Container style={{ marginTop: '30px' }}>
    <Link href="/"><FaArrowLeft/>Back</Link>
      <Grid container spacing={2} mt='30px'>
        <Grid item xs={12} sm={6}>
          {singleProperty.images && (
            <Image src={`${BACKENDURL}/${singleProperty.images.replace(/\\/g, '/')}`} alt={singleProperty.title} />
          )}
        </Grid>
        <Grid item xs={12} sm={6}>
          <Typography variant="h4">Property Details</Typography>
          <Typography variant="h5">Title: {singleProperty.title}</Typography>
          <Typography>Description: {singleProperty.description}</Typography>
          <Typography>{`Price: ${singleProperty.price}`}</Typography>
          <Typography>{`Place: ${singleProperty.place}`}</Typography>
          <Typography>{`Area: ${singleProperty.area}`}</Typography>
          <Typography>{`Bedrooms: ${singleProperty.bedrooms}`}</Typography>
          <Typography>{`Bathrooms: ${singleProperty.bathrooms}`}</Typography>
          <Typography>{`Amenities: ${singleProperty.amenities}`}</Typography>
        </Grid>
      </Grid>
      {seller.name && (
        <div>
          <Typography variant="h6">Seller Details:</Typography>
          <Typography>{`Name: ${seller.name}`}</Typography>
          <Typography>{`Email: ${seller.email}`}</Typography>
        </div>
      )}
      <Button variant="contained" color="primary" onClick={handleGetSellerDetails} style={{ marginTop: '20px' }}>
        I'M Interested
      </Button>
    </Container>
  );
};

export default SingleProperty;
