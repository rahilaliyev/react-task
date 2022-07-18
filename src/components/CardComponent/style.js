import styled from "styled-components";
import { Link } from "react-router-dom";

export const Card = styled.div`
  border: 3px solid black;
  padding: 20px;
  font-size: 14px;
  white-space: nowrap;
`;

export const CardLinkWrapper = styled.div`
  margin: 10px 0;
`;

export const CardLink = styled.a`
  color: blue;
  &:hover {
    text-decoration: underline;
  }
`;

export const CardInfo = styled.span`
  display: block;
`;

export const ButtonLink = styled(Link)`
  padding: 20px;
  text-align: center;
  border: 3px solid black;
  box-shadow: rgba(17, 17, 26, 0.1) 0px 1px 0px, rgba(17, 17, 26, 0.1) 0px 8px 24px, rgba(17, 17, 26, 0.1) 0px 16px 48px;
  margin-top: 20px;
  text-decoration: none;
  font-size: 18px;
  color: black;
  font-weight: 500;
`;
