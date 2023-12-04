import React, { useEffect, useState } from "react";
import axios from "axios";
import styled from "styled-components";
import { ImCross, ImCheckmark } from "react-icons/im";
import { Divider } from "./DetailsPage";

function Dashboard() {
  const [enrolledCourses, setEnrolledCourse] = useState();

  const getData = async () => {
    try {
      const data = await axios(`http://localhost:5000/student`).then(
        (res) => res.data
      );
      setEnrolledCourse(data);
    } catch (error) {
      console.log(error.message);
    }
  };
  useEffect(() => {
    getData();
  }, []);

  const handleProgress = async (id, progressStatus) => {
    const resp = await axios.patch(`http://localhost:5000/student/${id}`, {
      progress: progressStatus,
    });
    getData();
  };
  return (
    <>
      <CoursesHeader>
        <h1>Enrolled Courses</h1>
      </CoursesHeader>
      <Divider className="divider"></Divider>

      {enrolledCourses &&
        enrolledCourses.map(
          ({ id, name, thumbnail, instructor, duration, progress }) => (
            <DashboardSection key={id}>
              <DashboardContainer>
                <CourseThumbnail src={thumbnail} alt={name} />
                <CourseDetails>
                  <h3>{name}</h3>
                  <p>Instructor: {instructor}</p>
                  <p>Duration: {duration}</p>
                </CourseDetails>
                <ProgressWrapper>
                  <h5>Progress</h5>
                  <div className="btn-div">
                    <button onClick={() => handleProgress(id, "Incomplete")}>
                      Incomplete
                    </button>
                    <button onClick={() => handleProgress(id, "Completed")}>
                      Completed
                    </button>
                  </div>

                  <span className="cross">
                    {progress == "Incomplete" ? (
                      <ImCross color="red" title="Course is incomplete" />
                    ) : (
                      <ImCheckmark color="green" title="Course Completed" />
                    )}
                  </span>
                </ProgressWrapper>
              </DashboardContainer>
            </DashboardSection>
          )
        )}
    </>
  );
}

export default Dashboard;

// Styled Components
const CoursesHeader = styled.div`
  text-align: center;
  margin-top: 40px;
  h1 {
    font-size: 2em;
    color: #333;
  }
`;
const DashboardSection = styled.section`
  padding: 15px 30px;
`;
const DashboardContainer = styled.div`
  max-width: 90%;
  max-width: 900px;
  margin: 0 auto;
  padding: 20px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 20px;
  background-color: #f6f1f1b1;
  border-radius: 10px;
  @media (max-width: 880px) {
    flex-direction: column;
    text-align: center;
  }
`;

const CourseThumbnail = styled.img`
  width: 100px;
  height: 70px;
  border-radius: 8px;
`;
const CourseDetails = styled.div`
  text-align: left;
  h3 {
    margin-bottom: 5px;
  }
  @media (max-width: 880px) {
    text-align: center;
    h3 {
      margin-bottom: 5px;
    }
  }
`;

const ProgressWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  background-color: #e7e5e5;
  padding: 10px 30px;
  border-radius: 10px;
  .btn-div button {
    background-color: transparent;
    border: none;
    margin-left: 25px;
    font-family: inherit;
    padding: 6px 15px;
    border-radius: 5px;
    cursor: pointer;
    border: 1px solid gray;
  }
  button:hover {
    border: 1px solid black;
  }
  .cross {
    padding: 15px 0px 15px 50px;
    border-radius: 50%;
    font-size: 20px;
    display: block;
  }
  @media (max-width: 540px) {
    flex-direction: column;
    padding: 30px 10px 10px;

    .btn-div button {
      margin: 25px 10px 5px;
      padding: 6px 10px;
    }
    .cross {
      padding: 15px;
    }
  }
`;
