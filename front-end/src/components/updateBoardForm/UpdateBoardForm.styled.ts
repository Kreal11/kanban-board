import styled from "styled-components";

export const FormWrapper = styled.div`
  text-align: center;

  h3 {
    margin-bottom: 20px;
  }

  button {
    width: 100%;
    display: inline-flex;
    justify-content: center;
    align-items: center;
    border-radius: 8px;
    border: none;
    padding: 8px;
    transition: background-color 0.4s ease-in-out;

    &:hover {
      background-color: darkslategray;
    }
  }
`;

export const UpdateForm = styled.form`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 40px;

  input {
    padding: 10px 20px;
    border-radius: 8px;
    border: none;
    outline: none;
    font-size: 20px;
  }
`;
