import {
  useLoadScript,
  GoogleMap,
  MarkerF,
  CircleF,
} from "@react-google-maps/api";
import darkModeStyle from "../config/DarkMap.json";
import { useMemo, useState } from "react";
import usePlacesAutocomplete, {
  getGeocode,
  getLatLng,
} from "use-places-autocomplete";

const Home = () => {
  const [lat, setLat] = useState(40.73061);
  const [lng, setLng] = useState(-73.935242);

  const libraries = useMemo(() => ["places"], []);
  const mapCenter = useMemo(() => ({ lat: lat, lng: lng }), [lat, lng]);

  const { isLoaded } = useLoadScript({
    googleMapsApiKey: process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY,
    libraries: libraries,
  });

  if (!isLoaded) {
    return <p>Loading...</p>;
  }

  const onMarkerDragEnd = (event) => {
    setLat(event.latLng.lat());
    setLng(event.latLng.lng());
  };

  return (
    <div>
      <div className="hidden md:block">
        <GoogleMap
          options={{
            styles: darkModeStyle,
            zoomControl: true,
            streetViewControl: false,
            mapTypeControl: false,
            mapTypeControl: false,
            mapTypeControlOptions: {
              mapTypeIds: ["roadmap", "styled_map"],
            },
          }}
          zoom={11}
          center={mapCenter}
          mapTypeId={google.maps.MapTypeId.ROADMAP}
          mapContainerStyle={{
            width: "550px",
            height: "400px",
          }}
          className={"w-full sm:w-[10px]"}
          onLoad={(map) => console.log("Map Loaded")}
        >
          <MarkerF
            position={mapCenter}
            onLoad={() => console.log("Marker Loaded")}
            draggable={true}
            onDragEnd={onMarkerDragEnd}
            icon="https://i.ibb.co/1vh4rrN/pin.png"
          />

          {[4000, 10000].map((radius, idx) => {
            return (
              <CircleF
                key={idx}
                center={mapCenter}
                radius={radius}
                onLoad={() => console.log("Circle Load...")}
                options={{
                  fillColor: radius > 1000 ? "blue" : "blue",
                  strokeColor: radius > 1000 ? "blue" : "blue",
                  strokeOpacity: 0.8,
                }}
              />
            );
          })}
        </GoogleMap>
      </div>
      <div className="md:hidden">
        <GoogleMap
          options={{
            styles: darkModeStyle,
            zoomControl: true,
            streetViewControl: false,
            mapTypeControl: false,
            mapTypeControl: false,
            mapTypeControlOptions: {
              mapTypeIds: ["roadmap", "styled_map"],
            },
          }}
          zoom={11}
          center={mapCenter}
          mapTypeId={google.maps.MapTypeId.ROADMAP}
          mapContainerStyle={{
            width: "400px",
            height: "400px",
          }}
          className={"rounded-lg"}
          onLoad={(map) => console.log("Map Loaded")}
        >
          <MarkerF
            position={mapCenter}
            onLoad={() => console.log("Marker Loaded")}
            draggable={true}
            onDragEnd={onMarkerDragEnd}
            icon="https://i.ibb.co/1vh4rrN/pin.png"
          />

          {[4000, 10000].map((radius, idx) => {
            return (
              <CircleF
                key={idx}
                center={mapCenter}
                radius={radius}
                onLoad={() => console.log("Circle Load...")}
                options={{
                  fillColor: radius > 1000 ? "blue" : "blue",
                  strokeColor: radius > 1000 ? "blue" : "blue",
                  strokeOpacity: 0.8,
                }}
              />
            );
          })}
        </GoogleMap>
      </div>
      <div>
        {/* render Places Auto Complete and pass custom handler which updates the state */}
        <PlacesAutocomplete
          onAddressSelect={(address) => {
            getGeocode({ address: address }).then((results) => {
              const { lat, lng } = getLatLng(results[0]);

              setLat(lat);
              setLng(lng);
            });
          }}
        />
      </div>
    </div>
  );
};

const PlacesAutocomplete = ({ onAddressSelect }) => {
  const {
    ready,
    value,
    suggestions: { status, data },
    setValue,
    clearSuggestions,
  } = usePlacesAutocomplete({
    debounce: 300,
    cache: 86400,
  });

  const renderSuggestions = () => {
    return data.map((suggestion) => {
      const {
        place_id,
        structured_formatting: { main_text, secondary_text },
        description,
      } = suggestion;

      return (
        <li
          className="mt-3 bg-[#484f5e] rounded-[5px] p-2"
          key={place_id}
          onClick={() => {
            setValue(description, false);
            clearSuggestions();
            onAddressSelect && onAddressSelect(description);
          }}
        >
          <strong>{main_text}</strong> <small>{secondary_text}</small>
        </li>
      );
    });
  };

  const submitLocation = () => {
    closeModal;
  };

  return (
    <div>
      <p className="mt-4 mb-2 font-epilogue text-xl">
        Search by city or address
      </p>
      <input
        value={value}
        className="text-gray-300 bg-[#484f5e] rounded-[5px] border-[1px] border-[#1b2133] w-full md:px-4 py-2 pl-3 pr-10"
        disabled={!ready}
        onChange={(e) => setValue(e.target.value)}
        placeholder="123 Stariway To Heaven"
      />
      {status === "OK" && <ul className="text-white">{renderSuggestions()}</ul>}

      <div>
        <div className="mt-6 text-center pb-2">
          <div
            onClick={() => submitLocation}
            className="py-3 rounded-[10px] hover:cursor-pointer font-kanit font-bold text-xl bg-[#26365A] text-blue-400 hover:text-[#5285F6]"
          >
            <p>Select this location</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
