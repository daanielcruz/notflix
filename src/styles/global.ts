import { createGlobalStyle } from "styled-components";

export default createGlobalStyle`
* {
  box-sizing: border-box;
  font-family: "Roboto", sans-serif;
}

:root {
  --primary: #e50914;
  --black: #000000;
  --blackLighter: #9e9e9e;
  --grayLight: #f5f5f5;
  --grayMedium: #e5e5e5;
  --white: #ffffff;
  --arrow: rgba(255,255,255, 0.3);
}

html,
body {
  margin: 0;
}

a {
  color: inherit;
}

#root {
  min-height: calc(100vh - var(--bodyPaddingTop));
  display: flex;
  flex-direction: column;
}
`;
