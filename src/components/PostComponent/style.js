import styled from "styled-components";
import { Link } from "react-router-dom";

export const Post = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  border: 1px solid black;
  margin-bottom: 20px;
  padding: 10px 20px;
`;

export const PostLink = styled(Link)`
  width: 100%;
  padding: 10px;
  margin: 0 10px;
  color: black;
  font-size: 18px;
  font-weight: 600;
  &:hover {
    text-decoration: underline;
  }
`;

export const DeleteButton = styled.button`
  & .MuiSvgIcon-root {
    color: blue;
    margin-top: 5px;
  }
`;
