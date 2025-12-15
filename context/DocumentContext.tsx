"use client";

import React, { createContext, useReducer, useContext, ReactNode } from "react";
import {
  DocumentType,
  DocumentState,
  FormData,
  DocumentStyle,
  DocumentField,
  DocumentFields,
} from "@/lib/types";

type Action =
  | { type: "SET_TYPE"; payload: DocumentType }
  | { type: "UPDATE_DATA"; payload: { field: string; value: any } }
  | { type: "UPDATE_STYLE"; payload: Partial<DocumentStyle> }
  | { type: "SET_GENERATING"; payload: boolean }
  | { type: "RESET_STATE" };

const defaultDocumentType: DocumentType = "devis";

// Fonction utilitaire pour initialiser une valeur sûre
const getInitialValue = (
  field: DocumentField
): string | number | Date | null => {
  if (field.defaultValue !== undefined) {
    return field.defaultValue;
  }
  // Initialiser les champs de texte à chaîne vide pour éviter les erreurs de .split
  if (
    field.type === "text" ||
    field.type === "textarea" ||
    field.type === "select"
  ) {
    return "";
  }
  return null;
};

const initialState: DocumentState = {
  type: defaultDocumentType,
  data: DocumentFields[defaultDocumentType].reduce((acc, field) => {
    acc[field.id] = getInitialValue(field);
    return acc;
  }, {} as FormData),
  style: {
    logoUrl: null,
    primaryColor: "#10b981", // Vert
    secondaryColor: "#1f2937", // Graphite
    accentColor: "#f0f4f8", // Gris clair / Fond Tableau
    documentBgColor: "#ffffff", // Blanc Page A4
    fontFamily: "Inter",
    fontSize: 10,
  },
  isGenerating: false,
};

const DocumentContext = createContext<{
  state: DocumentState;
  dispatch: React.Dispatch<Action>;
}>({
  state: initialState,
  dispatch: () => null,
});

const documentReducer = (
  state: DocumentState,
  action: Action
): DocumentState => {
  switch (action.type) {
    case "SET_TYPE":
      const newType = action.payload;
      return {
        ...state,
        type: newType,
        data: DocumentFields[newType].reduce((acc, field) => {
          acc[field.id] = getInitialValue(field);
          return acc;
        }, {} as FormData),
      };
    case "UPDATE_DATA":
      return {
        ...state,
        data: {
          ...state.data,
          [action.payload.field]: action.payload.value,
        },
      };
    case "UPDATE_STYLE":
      return {
        ...state,
        style: {
          ...state.style,
          ...action.payload,
        },
      };
    case "SET_GENERATING":
      return {
        ...state,
        isGenerating: action.payload,
      };
    case "RESET_STATE":
      return initialState;
    default:
      return state;
  }
};

export const DocumentProvider = ({ children }: { children: ReactNode }) => {
  const [state, dispatch] = useReducer(documentReducer, initialState);

  return (
    <DocumentContext.Provider value={{ state, dispatch }}>
      {children}
    </DocumentContext.Provider>
  );
};

export const useDocument = () => {
  const context = useContext(DocumentContext);
  if (context === undefined) {
    throw new Error("useDocument must be used within a DocumentProvider");
  }
  return context;
};
