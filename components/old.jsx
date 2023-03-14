import React, { useState, useEffect, useMemo } from "react";
import { GoogleMap, useJsApiLoader, MarkerF } from "@react-google-maps/api";
import usePlacesAutocomplete, {
  getGeocode,
  getLatLng,
} from "use-places-autocomplete";
import {
  Combobox,
  ComboboxInput,
  ComboboxPopover,
  ComboboxList,
  ComboboxOption,
} from "@reach/combobox";

import darkModeStyle from "../config/DarkMap.json";

function Map() {
  const { isLoaded, loadError } = useJsApiLoader({
    googleMapsApiKey: "AIzaSyAhaj582by_DWcAsy7Puyb5AT8W7NUiKwE",
    libraries: ["places"],
  });

  const center = useMemo(() => ({ lat: 43.45, lng: -80.49 }), []);
  const [selected, setSelected] = useState(null);

  const onLoad = React.useCallback(function onLoad(mapInstance) {}, []);

  const onMarkerDragEnd = (event) => {
    setMarkerPosition({ lat: event.latLng.lat(), lng: event.latLng.lng() });
  };

  useEffect(() => {
    console.log(selected);
  }, [selected]);

  const renderMap = () => {
    return (
      <>
        <div>
          <PlacesAutocomplete setSelected={setSelected} />
        </div>
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
          onLoad={onLoad}
          center={center}
          zoom={15}
          mapContainerStyle={{ width: "550px", height: "400px" }}
          onClick={(event) =>
            setSelected({
              lat: event.latLng.lat(),
              lng: event.latLng.lng(),
            })
          }
        >
          {selected && (
            <MarkerF
              position={selected}
              draggable={true}
              onDragEnd={onMarkerDragEnd}
              icon="https://i.ibb.co/1vh4rrN/pin.png"
            />
          )}
        </GoogleMap>
      </>
    );
  };

  if (loadError) {
    return <div>Map cannot be loaded right now, sorry.</div>;
  }

  const PlacesAutocomplete = ({ setSelected }) => {
    const {
      ready,
      value,
      setValue,
      suggestions: { status, data },
      clearSuggestions,
    } = usePlacesAutocomplete();

    const handleSelect = async (address) => {
      setValue(address, false);
      clearSuggestions();

      const results = await getGeocode({ address });
      const { lat, lng } = await getLatLng(results[0]);
      setSelected({ lat, lng });
    };

    return (
      <Combobox onSelect={handleSelect}>
        <ComboboxInput
          value={value}
          onChange={(e) => setValue(e.target.value)}
          disabled={!ready}
          className="combobox-input text-black"
          placeholder="Search an address"
        />
        <ComboboxPopover>
          <ComboboxList>
            {status === "OK" &&
              data.map(({ place_id, description }) => (
                <ComboboxOption
                  key={place_id}
                  value={description}
                  className="bg-black"
                />
              ))}
          </ComboboxList>
        </ComboboxPopover>
      </Combobox>
    );
  };

  return (
    <div>
      <div>{isLoaded ? renderMap() : <div>Loading</div>}</div>
    </div>
  );
}

export default Map;
