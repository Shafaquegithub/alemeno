import React from "react";
import { useState } from "react";
import styled from "styled-components";
import { ImCross } from "react-icons/im";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";

function EnrollButton() {
  const [open, setOpen] = useState(false);
  const { id } = useParams();
  const navigate = useNavigate();
  const postData = async () => {
    try {
      const enrolledCourse = await axios(
        `http://localhost:5000/courses/${id}`
      ).then((res) => res.data);
      const posting = await axios.post(
        "http://localhost:5000/student",
        enrolledCourse
      );
      setOpen(false);
      navigate("/dashboard");
    } catch (error) {
      if (error.message == "Request failed with status code 500") {
        alert("You have already Enrolled for this Course");
        setOpen(false);
        navigate("/dashboard");
      } else {
        console.log(error.message);
      }
    }
  };
  return (
    <>
      {open ? (
        <ModalWrapper>
          <ModalContent>
            Do you really want to Enroll for this Course?
            <span className="cross" onClick={() => setOpen(false)}>
              <ImCross />
            </span>
            <ButtonWrapper>
              <button onClick={() => postData()}>Yes</button>
              <button onClick={() => setOpen(false)}>No</button>
            </ButtonWrapper>
          </ModalContent>
        </ModalWrapper>
      ) : null}
      <Button onClick={() => setOpen(true)}>Enroll Here</Button>
    </>
  );
}

export default EnrollButton;

const Button = styled.button`
  margin: 30px auto 70px;
  padding: 12px 70px;
  background-color: #333;
  color: #fff;
  font-family: inherit;
  outline: none;
  border: none;
`;

export const ModalWrapper = styled.div`
  position: fixed;
  left: 0;
  right: 0;
  top: 0;
  bottom: 0;
  background-color: #0f0f0fac;
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
`;
const ModalContent = styled.div`
  padding: 40px 20px;
  border: 1px solid gray;
  position: relative;
  background-color: white;
  width: 280px;
  height: 170px;
  border-radius: 7px;
  .cross {
    position: absolute;
    top: -10px;
    right: -10px;
    display: grid;
    place-items: center;
    padding: 10px;
    background-color: red;
    color: white;
    font-size: 12px;
    border-radius: 50%;
    cursor: pointer;
  }
`;
const ButtonWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-evenly;
  margin-top: 15px;
  button {
    background-color: white;
    border: none;
    cursor: pointer;
    font-size: 15px;
    font-weight: 700;
    font-family: inherit;
    padding: 5px 15px;
    border-radius: 5px;
  }
  button:hover {
    box-shadow: 2px 2px 25px gray;
  }
`;
