import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import styled from "styled-components";
import CourseInfo from "./CourseInfo";
import EnrollButton, { ModalWrapper } from "./EnrollButton";

const DetailsPage = () => {
  const { id } = useParams();
  const [singleCourse, setSingleCourse] = useState({});
  const [showSyllabus, setShowSyllabus] = useState(false);

  const getData = async () => {
    try {
      const data = await axios(`http://localhost:5000/courses/${id}`).then(
        (res) => res.data
      );
      setSingleCourse(data);
    } catch (error) {
      console.log(error.message);
    }
  };
  useEffect(() => {
    getData();
  }, []);

  return (
    <>
      <DetailsHeader>{singleCourse.name}</DetailsHeader>
      <Divider />
      <DetailsContainer>
        <CourseImage src={singleCourse.thumbnail} alt={singleCourse.name} />
        <CourseInfo
          singleCourse={singleCourse}
          showSyllabus={showSyllabus}
          setShowSyllabus={setShowSyllabus}
        />
      </DetailsContainer>
      <EnrollButton />
    </>
  );
};

// Styled Components
const DetailsHeader = styled.h1`
  font-size: 30px;
  margin: 60px 0 30px;
  padding: 0 30px;
  @media (max-width: 700px) {
    margin: 60px 0 20px;
    font-size: 25px;
    line-height: 35px;
  }
`;
export const Divider = styled.hr`
  width: 60px;
  height: 5px;
  margin: 20px auto 40px;
  background-color: black;
  @media (max-width: 700px) {
    margin: 20px auto 10px;
    font-size: 20px;
  }
`;
const DetailsContainer = styled.div`
  width: 90%;
  max-width: 1200px;
  margin: 0 auto;
  padding: 30px;
  display: flex;
  gap: 30px;
  justify-content: space-around;
  flex-direction: row;
  @media (max-width: 750px) {
    width: 100%;
    flex-direction: column;
    gap: 10px;
    justify-content: center;
  }
`;

const CourseImage = styled.img`
  width: 45%;
  height: 500px;
  border-radius: 8px;
  margin-bottom: 20px;
  @media (max-width: 750px) {
    width: 100%;
    height: 300px;
  }
`;

export default DetailsPage;
