import { useEffect, useRef } from "react";
import { createPortal } from "react-dom";

const Modal = ({ children }) => { // children is the content of the modal
  
  const elRef = useRef(null); // elRef is the reference to the modal element
  if(!elRef.current) {
    elRef.current = document.createElement("div"); // create a new div element to be saved in elRef 
                        // React will then render the children inside this div and reuse it
  }
  useEffect(() => { // useEffect is used to create the modal element
    const modalRoot = document.getElementById("modal"); // get the modal root element from the DOM = <div id="modal"></div>
    modalRoot.appendChild(elRef.current); // append the modal element to the modal root element
    return () => modalRoot.removeChild(elRef.current); // return a function to remove the modal element, else it will stay in the DOM and cause memory leaks
  }, []);

  return createPortal(<div>{children}</div>, elRef.current);
}

export default Modal;