import styled from "styled-components";

export const PageHeader = styled.div`
  display: flex;
  align-items: center;
`;

export const GoBackButton = styled.button`
  border: none;
  background: none;
  outline: none;
  display: flex;
  align-items: center;
  font-size: 14px;
  color: blue;
  cursor: pointer;
`;

export const HeaderText = styled.h1`
  width: 90%;
  text-align: center;
`;

export const AddButton = styled.button`
  border: none;
  background: blue;
  outline: none;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 14px;
  color: blue;
  border-radius: 50%;
  height: 45px;
  cursor: pointer;
  & .MuiSvgIcon-root {
    color: white;
  }
`;



export const SkeletonWrapper = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
`;

