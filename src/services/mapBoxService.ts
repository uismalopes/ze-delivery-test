import axios from "axios";

const mapBoxService = axios.create({
  baseURL: "https://api.mapbox.com/geocoding/v5/mapbox.places/",
  params: {
    access_token: process.env.MAP_BOX_API_KEY,
    country: "br",
    language: "pt",
    type: "address",
    limit: 3,
  },
});

export default mapBoxService;
