'use client';

import 'leaflet/dist/leaflet.css';
import { useState, FormEvent, useEffect } from 'react';
import Leaflet from 'leaflet';
import styles from './page.module.css';
import mapPackage from './package.svg';
import mapPin from './pin.svg';
import { v4 as uuidv4 } from 'uuid';
import AsyncSelect from 'react-select/async';
import { fetchLocalMapBox } from './apiMapBox';

import './page.module.css';

import {
  MapContainer,
  TileLayer,
  Marker,
  useMap,
  Popup,
} from 'react-leaflet';

export function ChangeView({ coords }) {
  const map = useMap();
  map.setView(coords, 12);
  return null;
}

// lat: -19.84452, lng: -43.99428,
const initialPosition = { lat: -19.84452, lng: -43.99428 };

const mapPackageIcon = Leaflet.icon({
  iconUrl: mapPackage,
  iconSize: [58, 68],
  iconAnchor: [29, 68],
  popupAnchor: [170, 2],
});

const mapPinIcon = Leaflet.icon({
  iconUrl: mapPin,
  iconSize: [58, 68],
  iconAnchor: [29, 68],
  popupAnchor: [170, 2],
});

interface Delivery {
  id: string;
  name: string;
  address: string;
  complement: string;
  latitude: number;
  longitude: number;
}

type Position = {
  longitude: number;
  latitude: number;
};

export default function Map() {
  const [deliveries, setDeliveries] = useState<Delivery[]>([]);

  const [position, setPosition] = useState<Position | null>(null);

  const [name, setName] = useState('');
  const [complement, setComplement] = useState('');
  const [address, setAddress] = useState<{
    label: string;
    value: string;
  } | null>(null);

  const [location, setLocation] = useState(initialPosition);

  const loadOptions = async (inputValue: any, callback: any) => {
    const response = await fetchLocalMapBox(inputValue);
    let places: any = [];
    if (inputValue.length < 3) return;
    response.features.map((item: any) => {
      places.push({
        label: item.place_name,
        value: item.place_name,
        coords: item.center,
        place: item.place_name,
      });
    });

    callback(places);
  };

  const handleChangeSelect = (event: any) => {
    setPosition({
      longitude: event.coords[0],
      latitude: event.coords[1],
    });

    setAddress({ label: event.place, value: event.place });

    setLocation({
      lng: event.coords[0],
      lat: event.coords[1],
    });
  };

  async function handleSubmit(event: FormEvent) {
    event.preventDefault();

    if (!address || !name) return;

    setDeliveries([
      ...deliveries,
      {
        id: uuidv4(),
        name,
        address: address?.value || '',
        complement,
        latitude: location.lat,
        longitude: location.lng,
      },
    ]);

    setName('');
    setAddress(null);
    setComplement('');
    setPosition(null);
  }

  return (
    <div id="page-map">
      <main>
        <form onSubmit={handleSubmit} className="landing-page-form">
          <div className="input-block">
            <AsyncSelect
              placeholder="Digite seu endereço..."
              classNamePrefix="filter"
              cacheOptions
              loadOptions={loadOptions}
              onChange={handleChangeSelect}
              value={address}
            />
          </div>
        </form>
      </main>

      <MapContainer
        center={location}
        zoom={12}
        style={{ height: '100vh' }}
      >
        <TileLayer
          //   attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
          //   url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          url={`https://api.mapbox.com/styles/v1/${process.env.NEXT_PUBLIC_ACCESS_USERNAME}/${process.env.NEXT_PUBLIC_ACCESS_CLIENTE_ID}/tiles/256/{z}/{x}/{y}@2x?access_token=${process.env.NEXT_PUBLIC_ACCESS_TOKEN_MAP_BOX}`}
          attribution='Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery &copy; <a href="https://www.mapbox.com/">Mapbox</a>'
        />
        {location.lat && location.lng && (
          <Marker
            icon={mapPinIcon}
            position={[location.lat, location.lng]}
          />
        )}
        {deliveries.map((delivery) => (
          <Marker
            key={delivery.id}
            icon={mapPackageIcon}
            position={[delivery.latitude, delivery.longitude]}
          >
            <Popup
              closeButton={false}
              minWidth={240}
              maxWidth={240}
              className="map-popup"
            >
              <div>
                <h3>{delivery.name}</h3>
                <p>
                  {delivery.address} - {delivery.complement}
                </p>
              </div>
            </Popup>
          </Marker>
        ))}
        <ChangeView coords={location} />
      </MapContainer>
    </div>
  );
}
