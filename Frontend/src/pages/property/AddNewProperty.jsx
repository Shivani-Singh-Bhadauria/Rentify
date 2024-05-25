import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { TextField, Button, Grid, Typography, Container, Input } from '@mui/material';
import { addProperty } from '../../redux/property/propertyAction';

const AddNewProperty = () => {
  const dispatch = useDispatch();
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    price: '',
    place: '',
    area: '',
    bedrooms: '',
    bathrooms: '',
    amenities: '',
  });
  const [image, setImage] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleFileChange = (e) => {
    setImage(e.target.files[0]);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const propertyData = new FormData();
    for (const key in formData) {
      propertyData.append(key, formData[key]);
    }
    if (image) {
      propertyData.append('image', image);
    }
    console.log(propertyData)
    dispatch(addProperty(propertyData));
    setFormData({
      title: '',
      description: '',
      price: '',
      place: '',
      area: '',
      bedrooms: '',
      bathrooms: '',
      amenities: '',
    });
    setImage(null);
    window.location.href="/"
  };

  return (
    <form onSubmit={handleSubmit}>
      <Container style={{ marginTop: '20px', marginBottom: '30px' }}>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <Typography variant="h5" gutterBottom>
              Add New Property
            </Typography>
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              style={{ marginTop: '20px' }}
              name="title"
              label="Title"
              variant="outlined"
              fullWidth
              value={formData.title}
              onChange={handleChange}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              style={{ marginTop: '20px' }}
              name="description"
              label="Description"
              variant="outlined"
              fullWidth
              value={formData.description}
              onChange={handleChange}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              style={{ marginTop: '20px' }}
              name="price"
              label="Price"
              variant="outlined"
              fullWidth
              type='number'
              value={formData.price}
              onChange={handleChange}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              style={{ marginTop: '20px' }}
              name="place"
              label="Place"
              variant="outlined"
              fullWidth
              value={formData.place}
              onChange={handleChange}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              style={{ marginTop: '20px' }}
              name="area"
              label="Area"
              variant="outlined"
              type='number'
              fullWidth
              value={formData.area}
              onChange={handleChange}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              style={{ marginTop: '20px' }}
              name="bedrooms"
              label="Bedrooms"
              variant="outlined"
              type='number'
              fullWidth
              value={formData.bedrooms}
              onChange={handleChange}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              style={{ marginTop: '20px' }}
              name="bathrooms"
              label="Bathrooms"
              variant="outlined"
              type='number'
              fullWidth
              value={formData.bathrooms}
              onChange={handleChange}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              style={{ marginTop: '20px' }}
              name="amenities"
              label="Amenities"
              variant="outlined"
              fullWidth
              value={formData.amenities}
              onChange={handleChange}
            />
          </Grid>
          <Grid item xs={12}>
            <Input
              style={{ marginTop: '20px' }}
              type="file"
              name="image"
              onChange={handleFileChange}
            />
          </Grid>
          <Grid item xs={12}>
            <Button
              type="submit"
              variant="contained"
              color="primary"
              style={{ width: '100%', marginTop: '30px' }}
            >
              Add Property
            </Button>
          </Grid>
        </Grid>
      </Container>
    </form>
  );
};

export default AddNewProperty;
