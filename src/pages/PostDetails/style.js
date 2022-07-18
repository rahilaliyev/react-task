import styled from "styled-components";

export const ButtonGroup = styled.div`
  display: flex;
  justify-content: space-between;
`;

export const Button = styled.button`
  color: blue;
  padding: 0;
  text-decoration: underline;
  &:hover {
    text-decoration: none;
  }
`;

export const Comment = styled.div`
  border: 3px solid black;
  margin: 20px 0;
  padding: 10px 20px;
`;

export const NameEmail = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

export const Name = styled.h5`
  margin: 10px 0;
  font-size: 16px;
`;

export const EmailLink = styled.a`
  color: blue;
  &:hover {
    text-decoration: underline;
  }
`;
