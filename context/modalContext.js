"use client";
import { usePathname } from "next/navigation";
import { useEffect } from "react";
import { useContext, createContext, useState } from "react";

export const ModalContext = createContext();

export function ModalProvider({ children }) {
  const [modalVisible, setModalVisible] = useState(false);
  const [modalContent, setModalContent] = useState(null);
  const pathname = usePathname();

  useEffect(() => {
    if (modalVisible) {
      hideModal();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pathname]);

  function showModal(content) {
    setModalContent(content);
    setModalVisible(true);
  }

  function hideModal() {
    setModalContent(null);
    setModalVisible(false);
  }
  return (
    <ModalContext.Provider
      value={{
        modalVisible,
        modalContent,
        showModal,
        hideModal,
      }}
    >
      {children}
    </ModalContext.Provider>
  );
}

export function useModal() {
  return useContext(ModalContext);
}
