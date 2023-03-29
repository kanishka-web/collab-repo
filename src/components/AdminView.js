import React, { useState } from "react";
import UserProject from "./UserProject";

const AdminView = (props) => {
  const {
    user,
    users,
    projects,
    managers,
    userProjects,
    onAddProject,
    onUpdateProject,
    onAddUser,
    onUpdateUser,
    onAssignProject,
    onUnassignProject,
  } = props;
  //console.log(user);

  // For Add and Update Projects
  const [addProject, setAddProject] = useState("");
  const [isError, setIsError] = useState(false);
  const [Error, setError] = useState("");
  const [status, setStatus] = useState("Active");

  const [updateProject, setUpdateProject] = useState('');
  const [updateProjectId, setUpdateProjectId] = useState('');
  const [projectStatus, setProjectStatus] = useState('');
  //console.log(status);

  // For Add Users
  const [addUser, setAddUser] = useState("");
  const [userEmail, setUserEmail] = useState("");
  const [userRole, setUserRole] = useState("");
  const [userManager, setUserManager] = useState("");
  const [isError2, setIsError2] = useState(false);
  const [Error2, setError2] = useState("");

  // For Update Users
  const [updateEmail, setUpdateEmail] = useState("");
  const [updateUser, setUpdateUser] = useState("");
  const [updateRole, setUpdateRole] = useState("");
  const [updateManager, setUpdateManager] = useState("");
  const [updateStatus, setUpdateStatus] = useState("");
  const [updateId, setUpdateId] = useState("");

  // For Managing UserProjects
  const [addUserProject, setAddUserProject] = useState("");

  // For viewing projects
  const [userProjectId, setUserProjectId] = useState('');
  const [userProjectEmail, setUserProjectEmail] = useState('');

  // Filtering other users except for Athe current user

  const otherUsers = users.filter((u) => {
    return u._id !== user._id;
  });

  // Getting managerOptions
  const managerOptions = managers.map((m) => {
    return <option value={m.email}>{m.email}</option>;
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

  const handleAddUserProject = (e, project, id) => {
    e.preventDefault();
    onAssignProject(project, id);
    e.target.userProject.value = "";
  };

  const handleAddProject = (e, project, projects) => {
    e.preventDefault();
    var check = 1;
    projects.some((p) => {
      if (project === p.name) {
        check = 0;
      }
    });
    if (check === 0) {
      setIsError(true);
      setError("The project already exists.");
      e.target.projectName.value = "";
    } else {
      setIsError(false);
      onAddProject(project);
      e.target.projectName.value = "";
    }
  };

  const handleUpdateUser = (e, user, manager, role, status, id) => {
    e.preventDefault();
    onUpdateUser(user, manager, role, status, id);
    e.target.userName.value = "";
    e.target.email.value = "";
    e.target.managerId.value = "";
    e.target.role.value = "";
    e.target.status.value = "";
  };

  const handleAddUser = (e, username, email, manager, role) => {
    e.preventDefault();
    var check = 1;
    users.some((u) => {
      if (email === u.email) {
        check = 0;
      }
    });
    if (check === 0) {
      setIsError2(true);
      setError2("The user already exists.");
    } else {
      setIsError2(false);
      onAddUser(username, email, manager, role);
    }
    e.target.userName.value = "";
    e.target.email.value = "";
    e.target.managerId.value = "";
    e.target.role.value = "";
  };

  // User Rows
  const usersDiv = otherUsers.map((u) => {
    return (
      <tr>
        <th scope="row">{u._id}</th>
        <td>{u.name}</td>
        <td>{u.email}</td>
        <td>
        {(u.managerId === "" &&  "-") || u.managerId}
        </td>
        <td>{u.role}</td>
        <td>{u.currentStatus}</td>
        <td>
          <i class="fa-solid fa-clone"></i>
        </td>
        <td><i class="fa-solid fa-file-lines" data-bs-toggle="modal"
                    data-bs-target="#staticBackdrop8" onClick={(e) => {
                        setUserProjectId(u._id) 
                        setUserProjectEmail(u.email)}}></i></td>
                    <div
                  class="modal fade"
                  id="staticBackdrop8"
                  data-bs-backdrop="static"
                  data-bs-keyboard="false"
                  tabindex="-1"
                  aria-labelledby="staticBackdrop8"
                  aria-hidden="true"
                >
                  <div class="modal-dialog">
                    <div class="modal-content">
                      <div class="modal-header">
                        <h5 class="modal-title" id="staticBackdropLabel8">
                          Assigned Projects | {userProjectEmail}
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

            <UserProject userProjects={userProjects} id={userProjectId} />
          </table>
                      </div>
                    </div>
                  </div>
                </div>
        <td>
          <i
            class="fa-solid fa-pen-to-square"
            data-bs-toggle="modal"
            onClick={(e) => {
              setUpdateUser(u.name);
              setUpdateEmail(u.email);
              if (u.managerId) {
                setUpdateManager(u.managerId);
              } else {
                setUpdateManager("");
              }
              setUpdateRole(u.role);
              setUpdateStatus(u.currentStatus);
              setUpdateId(u._id);
            }}
            data-bs-target="#staticBackdrop5"
          ></i>
        </td>

        <div
          class="modal fade"
          id="staticBackdrop5"
          data-bs-backdrop="static"
          data-bs-keyboard="false"
          tabindex="-1"
          aria-labelledby="staticBackdropLabel5"
          aria-hidden="true"
        >
          <div class="modal-dialog">
            <div class="modal-content">
              <div class="modal-header">
                <h5 class="modal-title" id="staticBackdropLabel5">
                  Edit User
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
                    handleUpdateUser(
                      e,
                      updateUser,
                      updateManager,
                      updateRole,
                      updateStatus,
                      updateId
                    )
                  }
                >
                  <div class="text-start my-3 px-3">
                    <label for="userName" class="form-label">
                      Name
                    </label>
                    <input
                      type="text"
                      class="form-control"
                      id="userName"
                      value={updateUser}
                      onChange={(e) => setUpdateUser(e.target.value)}
                      required
                    />
                    <label for="email" class="form-label">
                      Email
                    </label>
                    <input
                      type="email"
                      class="form-control"
                      id="email"
                      value={updateEmail}
                      required
                      disabled
                    />
                    <label for="managerId" class="form-label">
                      Manager
                    </label>
                    <select
                      class="form-select"
                      name="managerId"
                      onClick={(e) => setUpdateManager(e.target.value)}
                    >
                      <option selected value="">
                        No Manager
                      </option>
                      {managerOptions}
                    </select>
                    <label for="role" class="form-label">
                      Role
                    </label>
                    <select
                      class="form-select"
                      name="role"
                      onClick={(e) => setUpdateRole(e.target.value)}
                      required
                    >
                      <option selected value="" disabled>
                        Choose
                      </option>
                      <option value="User">User</option>
                      <option value="Manager">Manager</option>
                      <option value="Admin">Admin</option>
                    </select>
                    <label for="status" class="form-label">
                      Status
                    </label>
                    <select
                      class="form-select"
                      name="status"
                      onClick={(e) => setUpdateStatus(e.target.value)}
                      required
                    >
                      <option selected value="" disabled>
                        Choose
                      </option>
                      <option value="Active">Active</option>
                      <option value="LeftST">Left ST</option>
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
    );
  });

  // Project Rows
  const projectDiv = projects.map((p) => {
    return (
        <tr>



                        <th scope="row">{p._id}</th>
                        <td>{p.name}</td>
                        <td>{p.currentStatus}</td>
                        <td>
                        <i class="fa-solid fa-pen-to-square" onClick={(e) => {setUpdateProject(p.name)
                                                                              setUpdateProjectId(p._id) }}  data-bs-toggle="modal" data-bs-target="#staticBackdrop2"></i>
                        </td>


                        <div class="modal fade" id="staticBackdrop2" data-bs-backdrop="static" data-bs-keyboard="false" tabindex="-1" aria-labelledby="staticBackdropLabel2" aria-hidden="true">
                <div class="modal-dialog">
                    <div class="modal-content">
                    <div class="modal-header">
                        <h5 class="modal-title" id="staticBackdropLabel2">Update Project</h5>
                        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                    </div>
                    <div class="modal-body text-center">
                    <form onSubmit={(e) => onUpdateProject(e, projectStatus, updateProjectId)}>
                            <div class="text-start my-3 px-3">
                                <label for="projectName" class="form-label">Project Name</label>
                                <input type="text" value={updateProject} class="form-control" id="projectName" disabled/>
                                <label for="status" class="form-label">Status</label>
                                <select onClick={(e) => setProjectStatus(e.target.value)} class="form-select" name="select">
                                <option selected value="Active">Active</option>
                                <option value="Inactive">Inactive</option>
                                <option value="Closed">Closed</option>
                                </select>
                            </div>
                            <button type="submit" class="btn btn-primary mb-3">Submit</button>
                        </form>
                    </div>
                    </div>
                    </div>
                </div>
                        
        </tr>
        
    )
})

  return (
    <div class="AdminView">
      <ul class="nav nav-pills mb-3" id="pills-tab" role="tablist">
        {/* Pills for Admin Tabs */}
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
      </ul>
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
                <th class="col">Status</th>
                <th class="col">Data</th>
                <th class="col">Projects</th>
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
                          Add User
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
                            handleAddUser(
                              e,
                              addUser,
                              userEmail,
                              userManager,
                              userRole
                            )
                          }
                        >
                          <div class="text-start my-3 px-3">
                            <label for="userName" class="form-label">
                              Name
                            </label>
                            <input
                              type="text"
                              class="form-control"
                              id="name"
                              onChange={(e) => setAddUser(e.target.value)}
                              required
                            />
                            <label for="email" class="form-label">
                              Email
                            </label>
                            <input
                              type="email"
                              class="form-control"
                              id="email"
                              onChange={(e) => setUserEmail(e.target.value)}
                              required
                            />
                            <label for="managerId" class="form-label">
                              Manager
                            </label>
                            <select
                              class="form-select"
                              name="managerId"
                              onClick={(e) => setUserManager(e.target.value)}
                            >
                              <option selected value="">
                                No Manager
                              </option>
                              {managerOptions}
                            </select>
                            <label for="role" class="form-label">
                              Role
                            </label>
                            <select
                              class="form-select"
                              name="role"
                              onClick={(e) => setUserRole(e.target.value)}
                              required
                            >
                              <option selected value="User">
                                User
                              </option>
                              <option value="Manager">Manager</option>
                              <option value="Admin">Admin</option>
                            </select>
                          </div>
                          {isError2 && <p>{Error2}</p>}
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
            <tbody>
              <tr>
                <th scope="row">{user._id}</th>
                <td>{user.name}</td>
                <td>{user.email}</td>
                <td>{(user.managerId === "" &&  "-") || user.managerId}  </td>
                <td>{user.role}</td>
                <td>{user.currentStatus}</td>
                <td>
                  <i class="fa-solid fa-clone"></i>
                </td>
                <td>
                  <i class="fa-solid fa-file-lines" data-bs-toggle="modal"
                    data-bs-target="#staticBackdrop7"></i>
                </td>
                

                <div
                  class="modal fade"
                  id="staticBackdrop7"
                  data-bs-backdrop="static"
                  data-bs-keyboard="false"
                  tabindex="-1"
                  aria-labelledby="staticBackdrop7"
                  aria-hidden="true"
                >
                  <div class="modal-dialog">
                    <div class="modal-content">
                      <div class="modal-header">
                        <h5 class="modal-title" id="staticBackdropLabel7">
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

                <td>
                  <i
                    class="fa-solid fa-pen-to-square"
                    data-bs-toggle="modal"
                    onClick={(e) => {
                      setUpdateUser(user.name);
                      setUpdateEmail(user.email);
                      if (user.managerId) {
                        setUpdateManager(user.managerId);
                      } else {
                        setUpdateManager("");
                      }
                      setUpdateRole(user.role);
                      setUpdateStatus(user.currentStatus);
                      setUpdateId(user._id);
                    }}
                    data-bs-target="#staticBackdrop4"
                  ></i>
                </td>
                <div
                  class="modal fade"
                  id="staticBackdrop4"
                  data-bs-backdrop="static"
                  data-bs-keyboard="false"
                  tabindex="-1"
                  aria-labelledby="staticBackdropLabel4"
                  aria-hidden="true"
                >
                  <div class="modal-dialog">
                    <div class="modal-content">
                      <div class="modal-header">
                        <h5 class="modal-title" id="staticBackdropLabel4">
                          Edit User
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
                            handleUpdateUser(
                              e,
                              updateUser,
                              updateManager,
                              updateRole,
                              updateStatus,
                              updateId
                            )
                          }
                        >
                          <div class="text-start my-3 px-3">
                            <label for="userName" class="form-label">
                              Name
                            </label>
                            <input
                              type="text"
                              class="form-control"
                              id="userName"
                              onChange={(e) => setUpdateUser(e.target.value)}
                              required
                            />
                            <label for="email" class="form-label">
                              Email
                            </label>
                            <input
                              type="email"
                              class="form-control"
                              id="email"
                              value={user.email}
                              required
                              disabled
                            />
                            <label for="managerId" class="form-label">
                              Manager
                            </label>
                            <select
                              class="form-select"
                              name="managerId"
                              onClick={(e) => setUpdateManager(e.target.value)}
                            >
                              <option selected value="">
                                No Manager
                              </option>
                              {managerOptions}
                            </select>
                            <label for="role" class="form-label">
                              Role
                            </label>
                            <select
                              class="form-select"
                              name="role"
                              onClick={(e) => setUpdateRole(e.target.value)}
                              required
                            >
                              <option selected value="" disabled>
                                Choose
                              </option>
                              <option value="User">User</option>
                              <option value="Manager">Manager</option>
                              <option value="Admin">Admin</option>
                            </select>
                            <label for="status" class="form-label">
                              Status
                            </label>
                            <select
                              class="form-select"
                              name="status"
                              onClick={(e) => setUpdateStatus(e.target.value)}
                              required
                            >
                              <option selected value="" disabled>
                                Choose
                              </option>
                              <option value="Active">Active</option>
                              <option value="LeftST">Left ST</option>
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
              {usersDiv}
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
                <th scope="col">
                  <i
                    class="fa-solid fa-plus"
                    data-bs-toggle="modal"
                    data-bs-target="#staticBackdrop"
                  ></i>
                </th>
                <div
                  class="modal fade"
                  id="staticBackdrop"
                  data-bs-backdrop="static"
                  data-bs-keyboard="false"
                  tabindex="-1"
                  aria-labelledby="staticBackdropLabel"
                  aria-hidden="true"
                >
                  <div class="modal-dialog">
                    <div class="modal-content">
                      <div class="modal-header">
                        <h5 class="modal-title" id="staticBackdropLabel">
                          Add Project
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
                            handleAddProject(e, addProject, projects)
                          }
                        >
                          <div class="text-start my-3 px-3">
                            <label for="projectName" class="form-label">
                              Project Name
                            </label>
                            <input
                              type="text"
                              onChange={(e) => setAddProject(e.target.value)}
                              class="form-control"
                              id="projectName"
                            />
                          </div>
                          {isError && <p>{Error}</p>}
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

            <tbody>{projectDiv}</tbody>
          </table>
        </div>
        { /* Manage Projects Tab */}
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
                    data-bs-target="#staticBackdrop6"
                  ></i>
                </th>
                <div
                  class="modal fade"
                  id="staticBackdrop6"
                  data-bs-backdrop="static"
                  data-bs-keyboard="false"
                  tabindex="-1"
                  aria-labelledby="staticBackdropLabel6"
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
      </div>
    </div>
  );
};

export default AdminView;
