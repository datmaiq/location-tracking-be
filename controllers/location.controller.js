const parser = require("papaparse");
const User = require("../model/User.model");

exports.addLocation = async (req, res) => {
  try {
    const { name, latitude, longitude } = req.body;

    const { _id } = req.user;

    const updatedUser = await User.findByIdAndUpdate(
      _id,
      {
        $push: {
          locations: {
            name,
            latitude,
            longitude,
          },
        },
        $set: {
          currentLocation: {
            name,
            latitude,
            longitude,
          },
        },
      },
      { new: true, useFindAndModify: false }
    );

    // if user is not found
    if (!updatedUser) {
      return res.status(404).json({
        message: "User not found",
        data: null,
      });
    }

    res.status(200).json({
      message: "Location added successfully!",
      data: updatedUser,
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
      data: null,
    });
  }
};

exports.editLocation = async (req, res) => {
  try {
    const { _id } = req.user;

    const { locationId } = req.params;

    const { name: newLocationName } = req.body;

    const updatedUser = await User.findOneAndUpdate(
      { _id, "locations._id": locationId },
      {
        $set: {
          "locations.$.name": newLocationName,
        },
      },
      { new: true }
    );

    if (!updatedUser) {
      return res.status(404).json({
        message: "Location not found",
        data: null,
      });
    }

    res.status(200).json({
      message: "Location updated successfully",
      data: updatedUser,
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
      data: null,
    });
  }
};

exports.deleteLocation = async (req, res) => {
  try {
    const { _id } = req.user;

    const { locationId } = req.params;

    const location = await User.findOneAndUpdate(
      { _id, "locations._id": locationId },
      {
        $pull: {
          locations: { _id: locationId },
        },
      },
      { new: true }
    );

    if (!location) {
      return res.status(404).json({
        message: "Location not found",
        data: null,
      });
    }

    res.status(200).json({
      message: "Location deleted successfully!",
      data: location,
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
      data: null,
    });
  }
};

exports.getLocationCsvData = async (req, res) => {
  try {
    const { _id } = req.user;
    const user = await User.findById(_id);
    const { locations } = user;

    const formattedData = locations.map((location) => ({
      Name: location.name,
      Latitude: location.latitude,
      Longitude: location.longitude,
    }));

    const csv = parser.unparse(formattedData, {
      header: true,
    });

    res.header("Content-Type", "text/csv");
    res.status(200).send(csv);
  } catch (error) {
    res.status(500).json({
      message: error.message,
      data: null,
    });
  }
};
