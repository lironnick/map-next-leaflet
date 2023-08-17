export const fetchLocalMapBox = (local: string) =>
  fetch(
    `https://api.mapbox.com/geocoding/v5/mapbox.places/${local}.json?access_token=${process.env.NEXT_PUBLIC_ACCESS_TOKEN_MAP_BOX}`
  )
    .then((response) => response.json())
    .then((data) => data);
