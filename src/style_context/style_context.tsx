import * as React from "react";

export interface StyleContext {
  shades: {
    text: string;
    selectedText: string;
    border: string;
    separation: string;
    boxShadow: string;
  };
  colors: {
    cardBackground: string;
    highlight: string;
    aivenDark: string;
    aivenBright: string;
  };
  sizes: {
    font: {
      headline: string;
      subHeadline: string;
      text: string;
      smallText: string;
    };
    width: {
      content: string;
    };
  };
  padding: {};
}

export const defaultStyles: StyleContext = {
  shades: {
    text: "#FAFAFA",
    selectedText: "#FFFFFF",
    border: "#808080",
    separation: "#808080",
    boxShadow: "#C0C0C0",
  },
  colors: {
    cardBackground: "#FAFAFA",
    highlight: "#ff3554", // aiven branding
    aivenDark: "#ff3554",
    aivenBright: "#ff7503"
  },
  sizes: {
    font: {
      headline: "40px",
      subHeadline: "28px",
      text: "20px",
      smallText: "16px"
    },
    width: {
      content: "70%",
    },
  },
  padding: {},
};

export const styleContext = React.createContext(defaultStyles);
