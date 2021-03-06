import { createGlobalStyle, DefaultTheme } from "styled-components";
import { reset } from "styled-reset";

export const lightTheme: DefaultTheme = {
  bgColor: "#fafafa",
  blockColor: "#ffffff",
  borderColor: "#dbdbdb",
  accentColor: "#1f93d6",
};

export const darkTheme: DefaultTheme = {
  bgColor: "grey",
  blockColor: "black",
  borderColor: "white",
  accentColor: "#1f93d6",
};

export const GlobalStyles = createGlobalStyle`
  * {
    box-sizing:border-box;
    margin-bottom: 20px;
  }
  a {
    text-decoration: none;
    color: inherit;
  }
  body {
    height: 100vh;
    width: 100vw;
    margin: 0 auto;
    background-color: ${(props) => props.theme.bgColor};
  }
  ${reset}
`;
