import React from "react";
import styled from "styled-components";

function CourseInfo({ singleCourse, showSyllabus, setShowSyllabus }) {
  return (
    <>
      <CourseInfoSec>
        <h2>Instructor : {singleCourse.instructor}</h2>
        <h4>
          <span>Description</span> : {singleCourse.description}
        </h4>
        <h4>
          <span>Enrollment status</span> : {singleCourse.enrollmentStatus}
        </h4>
        <h4>
          <span>Course duration</span> : {singleCourse.duration}
        </h4>
        <h4>
          <span>Schedule</span> : {singleCourse.schedule}
        </h4>
        <h4>
          <span>Location</span> : {singleCourse.location}
        </h4>
        <h4>
          <span>Pre-requisites</span> : {singleCourse.prerequisites}
        </h4>
        <h4 className="syllabus">
          <h4 className="syllabus-opener">
            <span>Syllabus</span>
            <span onClick={() => setShowSyllabus(!showSyllabus)}>
              {showSyllabus ? "-" : "+"}
            </span>
          </h4>
          {singleCourse.syllabus &&
            showSyllabus &&
            singleCourse.syllabus.map((syllabus) => (
              <>
                <p>
                  <span>Week</span> : {syllabus.week}
                </p>
                <p>
                  <span>Topic</span> : {syllabus.topic}
                </p>
                <p>
                  <span>Content</span> : {syllabus.content}
                </p>
                <hr />
              </>
            ))}
        </h4>
      </CourseInfoSec>
    </>
  );
}

export default CourseInfo;

//styled Components
const CourseInfoSec = styled.div`
  width: 100%;
  text-align: left;
  @media (max-width: 750px) {
    width: 95%;
  }
  h1 {
    font-size: 2em;
    color: #333;
    margin-bottom: 10px;
  }

  p {
    color: #666;
    margin-bottom: 20px;
  }
  span {
    color: black;
  }
  h2,
  h4 {
    padding: 6px 0;
    line-height: 30px;
  }
  h4 {
    color: gray;
  }
  .syllabus p {
    line-height: 20px;
    margin: 0;
  }
  hr {
    margin: 8px 0;
    border-top: 1px solid #d7d3d3;
  }
  .syllabus-opener {
    display: flex;
    justify-content: space-between;
    background-color: #e7e5e5;
    padding: 5px 10px;
    margin-bottom: 10px;
  }
  .syllabus-opener span:nth-child(2) {
    font-size: 30px;
    cursor: pointer;
  }
`;
