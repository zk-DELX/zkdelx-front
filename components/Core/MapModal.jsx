import ReactModal from "react-modal";
import { AiFillCloseCircle } from "react-icons/ai";
import Map from "../Map";

const Modal = (props) => {
  const modalStyle = {
    overlay: {
      backgroundColor: "rgba(11, 22, 11, 0.5)", // Set the background color with an alpha value
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
    },
    content: {
      top: "auto",
      left: "auto",
      right: "auto",
      bottom: "auto",
      maxWidth: "600px",
      width: "100%",
      maxHeight: "90%",
      margin: "auto",
      padding: "20px",
      borderRadius: "8px",
      background: "#121626",
      boxShadow: "#26365A",
    },
  };

  return (
    <ReactModal
      isOpen={props.isOpen}
      onRequestClose={props.onClose}
      style={modalStyle}
    >
      <div>
        <div className="flex justify-between text-3xl hover:cursor-pointer font-epilogue">
          <p>Select Location</p>
          <AiFillCloseCircle onClick={props.onClose} />
        </div>
        <div className="text-gray-500 font-bold text-sm mt-2">
          Search for a location by address, city or by dragging the marker on
          the map !
        </div>
        <div className="flex justify-center mt-2">
          <Map
            location={props.location}
            setLocation={props.setLocation}
            closeModal={props.onClose}
          />
        </div>
      </div>
    </ReactModal>
  );
};

export default Modal;
