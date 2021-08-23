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
    background: string;
    cardBackground: string;
    highlight: string;
  };
  sizes: {
    font: {
      headline: string;
      subHeadline: string;
      text: string;
    };
    width: {
      content: string;
    };
  };
  padding: {};
}

//https://www.schemecolor.com/blue-white-grey-and-black.php

export const defaultStyles: StyleContext = {
  shades: {
    text: "#303030",
    selectedText: "#1C1C1C",
    border: "#808080",
    separation: "#808080",
    boxShadow: "#C0C0C0",
  },
  colors: {
    background: "#F0F0F0",
    cardBackground: "#FAFAFA",
    highlight: "#3466AA",
  },
  sizes: {
    font: {
      headline: "40px",
      subHeadline: "28px",
      text: "20px",
    },
    width: {
      content: "70%",
    },
  },
  padding: {},
};

export const styleContext = React.createContext(defaultStyles);
