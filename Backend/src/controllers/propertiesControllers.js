import Property from "../models/property-model.js";
import Users from "../models/users-model.js";

export const AddNewProperty = async (req, res) => {
  try {
    const {
      title,
      description,
      price,
      place,
      area,
      bedrooms,
      bathrooms,
      amenities,
    } = req.body;
    const user = await Users.findById(res.locals.jwtData.id);

    const property = new Property({
      title,
      description,
      price,
      place,
      area,
      bedrooms,
      bathrooms,
      amenities,
      images:req.file.path,
      seller: user._id,
    });

    await property.save();
    res.status(201).json({ message: 'Property posted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error });
  }
};



export const GetAllProperties = async (req, res) => {
  try {
    const properties = await Property.find();
    res.status(200).json(properties);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch properties' });
  }

};
export const getSingleProperty = async (req, res) => {
  try {
    const { id } = req.params;
    const property = await Property.findById(id);

    if (!property) {
      return res.status(404).json({ error: 'Property not found' });
    }

    res.json(property);
  } catch (error) {
    res.status(500).json({ error: 'Server error' });
  }
};