const axios = require("axios");

exports.autocomplete = async (req, res) => {
  const { searchKey } = req.params;
  const url = `https://nominatim.openstreetmap.org/search?addressdetails=1&q=${encodeURIComponent(
    searchKey
  )}&format=json`;
  try {
    const response = await axios.get(url, { headers: { 'User-Agent': 'LocationTracking/1.0' }  });
    console.log(response.request.headers)
    const transformedData = response.data.map((location) => ({
      latitude: location.lat,
      longitude: location.lon,
      city:
        location.address.city ||
        location.address.town ||
        location.address.village ||
        "",
      country: location.address.country,
      formattedAddress: location.display_name,
    }));

    res.status(200).json({
      message: "location(s) found!",
      data: transformedData,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: error.message,
      data: null,
    });
  }
};
