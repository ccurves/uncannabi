import { css } from "styled-components";

export const mobile = (props) => {
  return css`
    @media only screen and (max-width: 350px) {
      ${props}
    }
    @media only screen and (max-width: 380px) {
      ${props}
    }
    @media only screen and (mmin-width: 568px) {
      ${props}
    }
    @media only screen and (mmin-width: 768px) {
      ${props}
    }
  `;
};
