import React, { useState } from "react";
import FillWeeklyData from "./FillWeeklyData";
import UserProject from "./UserProject";

const UserView = (props) => {
  const { user, projects, userProjects, onAssignProject, onUnassignProject,weeklyData,weeklyEntry } =
    props;
  //console.log(user);
  //console.log(userProjects);
  // For Managing UserProjects
  const [addUserProject, setAddUserProject] = useState("");

  // WeekNumber and Year for WeeklyData

  const currentDate = new Date();
  const startDate = new Date(currentDate.getFullYear(), 0, 1);
  const days = Math.floor((currentDate - startDate) /
      (24 * 60 * 60 * 1000));

  const weekNumber = Math.ceil(days / 7);
  const year = currentDate.getFullYear()

  //console.log(weekNumber);
  //console.log(year);


  //Filters and returns active Projects
  const activeProjects = projects.filter((p) => {
    return p.currentStatus === "Active";
  });

  const projectDiv = activeProjects.map((p) => {
    return (
      <tr>
        <th scope="row">{p._id}</th>
        <td>{p.name}</td>
        <td>{p.currentStatus}</td>
      </tr>
    );
  });

  // Filters and returns userProjects of the current user
  const userUserProjects = userProjects.filter((up) => {
    return up.userId === user._id;
  });

  const userProjectDiv = userUserProjects.map((uup) => {
    if (uup.currentStatus === "Active") {
      return (
        <tr>
          <th scope="row">{uup.projectId}</th>
          <td scope="col">{uup.currentStatus}</td>
          <td>
            <i
              class="fa-solid fa-xmark"
              onClick={(e) => onUnassignProject(e, uup.projectId, uup.userId)}
            ></i>
          </td>
        </tr>
      );
    }
  });

  // Options for Assigning UserProjects
  const userProjectOptions = projects.map((p) => {
    var check = 1;
    userUserProjects.some((uup) => {
      if (uup.projectId === p.name && uup.currentStatus === "Active") {
        check = 0;
      }
    });

    if (p.currentStatus === "Active" && check === 1) {
      return <option value={p.name}>{p.name}</option>;
    }
  });

  // Function to handle assigning userProject
  const handleAddUserProject = (e, project, id) => {
    e.preventDefault();
    onAssignProject(project, id);
    e.target.userProject.value = "";
  };

  return (
    <div class="userview">
      {/* Nav pills for different parts */}
      <ul class="nav nav-pills mb-3" id="pills-tab" role="tablist">
        <li class="nav-item" role="presentation">
          <button
            class="nav-link active"
            id="pills-users-tab"
            data-bs-toggle="pill"
            data-bs-target="#pills-users"
            type="button"
            role="tab"
            aria-controls="pills-users"
            aria-selected="true"
          >
            Users
          </button>
        </li>
        <li class="nav-item" role="presentation">
          <button
            class="nav-link"
            id="pills-projects-tab"
            data-bs-toggle="pill"
            data-bs-target="#pills-projects"
            type="button"
            role="tab"
            aria-controls="pills-projects"
            aria-selected="false"
          >
            Projects
          </button>
        </li>
        <li class="nav-item" role="presentation">
          <button
            class="nav-link"
            id="pills-manage-projects-tab"
            data-bs-toggle="pill"
            data-bs-target="#pills-manage-projects"
            type="button"
            role="tab"
            aria-controls="pills-manage-projects"
            aria-selected="false"
          >
            Manage Projects
          </button>
        </li>
        <li class="nav-item" role="presentation">
          <button
            class="nav-link"
            id="pills-weekly-data-tab"
            data-bs-toggle="pill"
            data-bs-target="#pills-weekly-data"
            type="button"
            role="tab"
            aria-controls="pills-weekly-data"
            aria-selected="false"
          >
            Fill Weekly Data
          </button>
        </li>
      </ul>
      {/* Tabs for the nav-pills */}
      <div class="tab-content" id="pills-tabContent">
        {/* User Tab */}
        <div
          class="tab-pane fade show active"
          id="pills-users"
          role="tabpanel"
          aria-labelledby="pills-users-tab"
          tabindex="0"
        >
          <table class="table table-primary table-hover text-center">
            <thead>
              <tr>
                <th scope="col">ID</th>
                <th scope="col">Name</th>
                <th scope="col">Mail Initials</th>
                <th scope="col">Manager</th>
                <th class="col">Role</th>
                <th class="col">Data</th>
                <th class="col">Projects</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <th scope="row">{user._id}</th>
                <td>{user.name}</td>
                <td>{user.email}</td>
                <td>{(user.managerId === "" &&  "-") || user.managerId}</td>
                <td>{user.role}</td>
                <td>
                  <i class="fa-solid fa-clone"></i>
                </td>
                <td>
                  <i class="fa-solid fa-file-lines" data-bs-toggle="modal"
                    data-bs-target="#staticBackdrop5"></i>
                </td>
                <div
                  class="modal fade"
                  id="staticBackdrop5"
                  data-bs-backdrop="static"
                  data-bs-keyboard="false"
                  tabindex="-1"
                  aria-labelledby="staticBackdrop5"
                  aria-hidden="true"
                >
                  <div class="modal-dialog">
                    <div class="modal-content">
                      <div class="modal-header">
                        <h5 class="modal-title" id="staticBackdropLabel5">
                          Assigned Projects | {user.email}
                        </h5>
                        <button
                          type="button"
                          class="btn-close"
                          data-bs-dismiss="modal"
                          aria-label="Close"
                        ></button>
                      </div>
                      <div class="modal-body text-center">
                      <table class="table table-primary table-hover text-center">
            <thead>
              <tr>
                <th scope="col">Project Name</th>
                <th scope="col">Status</th>

               

              </tr>
            </thead>

            <UserProject userProjects={userProjects} id={user._id} />
          </table>
                      </div>
                    </div>
                  </div>
                </div>
              </tr>
            </tbody>
          </table>
        </div>
        {/* Project Tab */}
        <div
          class="tab-pane fade"
          id="pills-projects"
          role="tabpanel"
          aria-labelledby="pills-projects-tab"
          tabindex="0"
        >
          <table class="table table-primary table-hover text-center">
            <thead>
              <tr>
                <th scope="col">ID</th>
                <th scope="col">Project Name</th>
                <th scope="col">Status</th>
              </tr>
            </thead>
            <tbody>{projectDiv}</tbody>
          </table>
        </div>

      {/* Assign Projects Tab */}
        <div
          class="tab-pane fade"
          id="pills-manage-projects"
          role="tabpanel"
          aria-labelledby="pills-manage-projects-tab"
          tabindex="0"
        >
          <table class="table table-primary table-hover text-center">
            <thead>
              <tr>
                <th scope="col">Project Name</th>
                <th scope="col">Status</th>

                <th scope="col">
                  <i
                    class="fa-solid fa-plus"
                    data-bs-toggle="modal"
                    data-bs-target="#staticBackdrop3"
                  ></i>
                </th>
                <div
                  class="modal fade"
                  id="staticBackdrop3"
                  data-bs-backdrop="static"
                  data-bs-keyboard="false"
                  tabindex="-1"
                  aria-labelledby="staticBackdropLabel3"
                  aria-hidden="true"
                >
                  <div class="modal-dialog">
                    <div class="modal-content">
                      <div class="modal-header">
                        <h5 class="modal-title" id="staticBackdropLabel3">
                          Assign Project
                        </h5>
                        <button
                          type="button"
                          class="btn-close"
                          data-bs-dismiss="modal"
                          aria-label="Close"
                        ></button>
                      </div>
                      <div class="modal-body text-center">
                        <form
                          onSubmit={(e) =>
                            handleAddUserProject(e, addUserProject, user._id)
                          }
                        >
                          <div class="text-start my-3 px-3">
                            <label for="userProject" class="form-label">
                              Project
                            </label>
                            <select
                              onClick={(e) => setAddUserProject(e.target.value)}
                              class="form-select"
                              name="userProject"
                            >
                              <option selected value="" disabled>
                                Choose
                              </option>
                              {userProjectOptions}
                            </select>
                          </div>
                          <button type="submit" class="btn btn-primary mb-3">
                            Submit
                          </button>
                        </form>
                      </div>
                    </div>
                  </div>
                </div>
              </tr>
            </thead>

            <tbody>{userProjectDiv}</tbody>
          </table>
        </div>

        <div
          class="tab-pane fade"
          id="pills-weekly-data"
          role="tabpanel"
          aria-labelledby="pills-weekly-data-tab"
          tabindex="0"
        >
       <FillWeeklyData
       weeklyData={weeklyData}
       weeklyEntry={weeklyEntry}
       projects={projects}
       />

     </div>

      </div>
    </div>
  );
};

export default UserView;
