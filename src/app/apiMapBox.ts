// const ACCESS_TOKEN_MAP_BOX = `access_token=${process.env.REACT_APP_ACCESS_TOKEN_MAP_BOX}`;
import { env } from 'process';
const ACCESS_TOKEN_MAP_BOX = `access_token=${env.REACT_APP_ACCESS_TOKEN_MAP_BOX}`;
// const ACCESS_TOKEN_MAP_BOX = `access_token=${process.env.REACT_APP_ACCESS_TOKEN_MAP_BOX}`;

export const fetchLocalMapBox = (local: string) =>
  fetch(
    // `https://api.mapbox.com/geocoding/v5/mapbox.places/${local}.json?${ACCESS_TOKEN_MAP_BOX}`
    `https://api.mapbox.com/geocoding/v5/mapbox.places/${local}.json?access_token=${ACCESS_TOKEN_MAP_BOX}`
  )
    .then((response) => response.json())
    .then((data) => data);
