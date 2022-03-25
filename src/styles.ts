import { createGlobalStyle, DefaultTheme } from "styled-components";
import { reset } from "styled-reset";

export const lightTheme: DefaultTheme = {
  bgcolor: "gainsboro",
  blockColor: "white",
};

export const darkTheme: DefaultTheme = {
  bgcolor: "grey",
  blockColor: "black",
};

export const GlobalStyles = createGlobalStyle`
  * {
    box-sizing:border-box;
    margin-bottom: 20px;
  }
  a {
    text-decoration: none;
  }
  ${reset}
`;
