import React, { createContext,useReducer,createRef } from "react";
import { modalReducer } from './modalReducer';

export const ModalContext = createContext(null);

let initialState = {
  open: false
};

export const ModalContextProvider = (props) => {
  let [openLoginModal, dispatch] = useReducer(modalReducer, initialState);

let blogsHeadingRef = createRef<HTMLHeadingElement>();

  const handleOpenLoginModal = () => {
      dispatch({
          type:"OPEN_MODAL"
      });
  };

  const handleCloseLoginModal = () => {
     dispatch({
          type:"CLOSE_MODAL"
      });
  };

  return (
    <ModalContext.Provider
          value={{
              openLoginModal: openLoginModal.open,handleOpenLoginModal, handleCloseLoginModal,blogsHeadingRef}}
    >
      {props.children}
    </ModalContext.Provider>
  );
};
