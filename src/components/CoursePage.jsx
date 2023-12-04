import React from "react";
import styled from "styled-components";
import { useState, useEffect } from "react";
import axios from "axios";
import { NavLink } from "react-router-dom";
import { Divider } from "./DetailsPage";

const CoursesPage = () => {
  const [courses, setCourses] = useState([]);
  const getData = async () => {
    try {
      const data = await axios("http://localhost:5000/courses").then(
        (res) => res.data
      );
      setCourses(data);
    } catch (error) {
      console.log(error.message);
    }
  };
  useEffect(() => {
    getData();
  }, []);
  return (
    <CoursesContainer>
      <CoursesHeader>
        <h1>All Courses</h1>
      </CoursesHeader>
      <Divider className="divider"></Divider>
      <CoursesList>
        {courses.map((course) => (
          <NavLink
            to={`/detailspage/${course.id}`}
            key={course.id}
            className={"navlink"}
          >
            <CourseCard>
              <CourseImg src={course.thumbnail} alt="" />
              <h3>{course.name}</h3>
              <p>{course.description}</p>
            </CourseCard>
          </NavLink>
        ))}
      </CoursesList>
    </CoursesContainer>
  );
};

// Styled Components
const CoursesContainer = styled.div`
  width: 100%;
  max-width: 1200px;
  margin: 0 auto;
  padding: 30px;
  .navlink {
    text-decoration: none;
    color: black;
  }
  .divider {
    margin: -10px auto 70px;
  }
`;

const CoursesHeader = styled.div`
  text-align: center;
  margin-bottom: 60px;
  h1 {
    font-size: 2em;
    color: #333;
  }
`;

const CoursesList = styled.div`
  display: grid;
  grid-gap: 40px 30px;
  padding: 0;
  grid-template-columns: repeat(auto-fit, minmax(270px, 1fr));
`;
const CourseImg = styled.img`
  width: 100%;
  border-radius: 8px 8px 0 0;
  height: 180px;
  margin-bottom: 10px;
`;

const CourseCard = styled.div`
  background-color: #f9f9f9;
  border-radius: 8px;
  padding-bottom: 30px;
  box-shadow: 3px 4px 8px rgba(0, 0, 0, 0.1);
  height: 310px;
  transition: all 0.2s ease;
  cursor: pointer;
  h2,
  p,
  h3 {
    padding: 5px 15px;
  }
  &:hover {
    box-shadow: 0 4px 10px rgba(0, 0, 0, 0.4);
  }
`;

export default CoursesPage;
