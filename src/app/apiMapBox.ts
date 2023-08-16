// const ACCESS_TOKEN_MAP_BOX = `access_token=${process.env.REACT_APP_ACCESS_TOKEN_MAP_BOX}`;
const ACCESS_TOKEN_MAP_BOX = `access_token=pk.eyJ1IjoibGlyb25uaWNrIiwiYSI6ImNsbGUzbDYzcDBldm0zZWw2ejU2cjk2bWYifQ.ta74HS6F6fNhcqOQHxv6JA`;

export const fetchLocalMapBox = (local: string) =>
  fetch(
    // `https://api.mapbox.com/geocoding/v5/mapbox.places/${local}.json?${ACCESS_TOKEN_MAP_BOX}`
    `https://api.mapbox.com/geocoding/v5/mapbox.places/${local}.json?access_token=pk.eyJ1IjoibGlyb25uaWNrIiwiYSI6ImNsbGUzbDYzcDBldm0zZWw2ejU2cjk2bWYifQ.ta74HS6F6fNhcqOQHxv6JA`
  )
    .then((response) => response.json())
    .then((data) => data);
