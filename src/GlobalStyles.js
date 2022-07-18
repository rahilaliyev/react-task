import styled, { createGlobalStyle } from "styled-components";

export const Container = styled.div`
  width: 1200px;
  margin: 100px auto;
`;

export const SpinnerWrapper = styled.div`
  display: flex;
  justify-content: center;
`;

export const ModalContainer = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 400px;
  border: 2px solid #000;
  box-shadow: 24px;
  padding: 40px 20px;
  background-color: white;
`;

export const Header = styled.h2`
  text-align: center;
`;

export const FormGroup = styled.div`
  width: 100%;
  display: flex;
  margin: 10px 0;
`;

export const Label = styled.label`
  width: 15%;
  font-size: 14px;
`;

export const Input = styled.input`
  height: 30px;
`;

export const Textarea = styled.textarea`
  height: 200px;
  font-family: sans-serif;
`;

export const ErrorText = styled.span`
  color: red;
  font-size: 12px;
  margin-left: 50px;
`;

export const ButtonWrapper = styled.div`
  width: 100%;
  display: flex;
  justify-content: flex-end;
`;

export const Buttons = styled.button`
  padding: 10px 20px;
  margin-top: 10px;
  margin-right: 20px;
  background-color: ${(props) => (props.variant === "outlined" ? "white" : "blue")};
  color: ${(props) => (props.variant === "outlined" ? "blue" : "white")};
  border-color: ${(props) => (props.variant === "outlined" ? "blue" : "transparent")};
  border: 1px solid;
  font-size: 16px;
  font-weight: 600;
  &:hover {
    background-color: ${(props) => (props.variant !== "outlined" ? "white" : "blue")};
    color: ${(props) => (props.variant !== "outlined" ? "blue" : "white")};
    border-color: "blue";
  }
`;

export const GlobalStyle = createGlobalStyle`
  body {
    margin: 0;
    padding: 0;
  }

  a {
    display: block;
    color: inherit;
    text-decoration: none;
  }

  span {
    display: block;
  }

  button {
    border: none; 
    background: none;
    outline: none;
    cursor: pointer;
    transition: 0.5s;
  }

  input, textarea {
    width: 100%;
    outline: none;
    border: 1px solid black;
    padding: 10px;
    border-radius: 8px;
    transition: 0.5s;
    &:active,
    &:focus {
      border: 1px solid #2563eb;
      box-shadow: rgb(37, 99, 235, 0.2) 0px 8px 24px;
    }
  }

  textarea {
    resize: none;
  }
`;
