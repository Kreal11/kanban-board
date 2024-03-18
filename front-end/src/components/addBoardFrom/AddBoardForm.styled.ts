import styled from "styled-components";

export const FormWrapper = styled.div`
  text-align: center;

  h3 {
    margin-bottom: 20px;
  }
`;

export const AddForm = styled.form`
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
