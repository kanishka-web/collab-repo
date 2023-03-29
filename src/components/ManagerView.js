import React, { useState } from 'react';
import UserProject from './UserProject';

const ManagerView = (props) => {
    const { user, users, projects, userProjects, onAddProject, onUpdateProject, onAssignProject, onUnassignProject} = props;
    //console.log(user);

    // For Add and Update Projects
    const [addProject, setAddProject] = useState('');
    const [isError, setIsError] = useState(false);
    const [Error, setError] = useState('');
    const [status, setStatus] = useState('Active');

    const [updateProject, setUpdateProject] = useState('');
    const [updateProjectId, setUpdateProjectId] = useState('');
    const [projectStatus, setProjectStatus] = useState('');
    //console.log(status);
    

    // For Managing UserProjects
    const [addUserProject, setAddUserProject] = useState('');

    // For viewing projects
    const [userProjectId, setUserProjectId] = useState('');
    const [userProjectEmail, setUserProjectEmail] = useState('');

    // Filtering users managed by managers

    const managedUsers = users.filter((u) => {
        return u.managerId === user.email;
    })

    // User Rows
    const usersDiv = managedUsers.map((u) => {
        return (
            <tr>
                <th scope="row">{u._id}</th>
                            <td>{u.name}</td>
                            <td>{u.email}</td>
                            <td>{user.email}</td>
                            <td>{u.role}</td>
                            <td><i class="fa-solid fa-clone"></i></td>
                            <td><i class="fa-solid fa-file-lines" data-bs-toggle="modal"
                    data-bs-target="#staticBackdrop6" onClick={(e) => {
                        setUserProjectId(u._id) 
                        setUserProjectEmail(u.email)}}></i></td>
                    <div
                  class="modal fade"
                  id="staticBackdrop6"
                  data-bs-backdrop="static"
                  data-bs-keyboard="false"
                  tabindex="-1"
                  aria-labelledby="staticBackdrop6"
                  aria-hidden="true"
                >
                  <div class="modal-dialog">
                    <div class="modal-content">
                      <div class="modal-header">
                        <h5 class="modal-title" id="staticBackdropLabel6">
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
            </tr>
        )
    })

    // Filtering userProjects of the user
    const userUserProjects = userProjects.filter(up => {
        return up.userId === user._id;
    })

    
    const userProjectDiv = userUserProjects.map((uup) => {
        if (uup.currentStatus === "Active") {
            return (
                <tr>
                                <th scope="row">{uup.projectId}</th>
                                <td scope="col">{uup.currentStatus}</td>
                                <td>
                                <i class="fa-solid fa-xmark" onClick={(e) => onUnassignProject(e, uup.projectId, uup.userId)}></i>
                                </td>
                                </tr>
            )
        }
    })

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
    });

    // Options for Assigning Projects
    const userProjectOptions = projects.map((p) => {
        var check = 1;
        userUserProjects.some((uup) => {
            if (uup.projectId === p.name && uup.currentStatus === "Active") {
              check = 0;
            }
          });

        if(p.currentStatus === "Active" && check === 1) {
            return (
            <option value={p.name}>{p.name}</option>
        )
        }
        
    });
    
    // Function for handling add projects
    const handleAddProject = (e, project, projects) => {
        e.preventDefault();
        var check = 1
        projects.some((p) => {
            if (project === p.name){
                check = 0;
            }
        });
        if(check === 0){
            setIsError(true);
            setError("The project already exists.");
            e.target.projectName.value = '';
        }
        else {
            setIsError(false);
            onAddProject(project);
            e.target.projectName.value = '';
        }
    }

    // Fucntion for handling OnAssignProject
    const handleAddUserProject = (e, project, id) => {
        e.preventDefault();
        onAssignProject(project, id);
        e.target.userProject.value = '';
    }


        return ( 
            <div class="managerview">
                
                { /* Tabs for Manager Pills */ }
                <ul class="nav nav-pills mb-3" id="pills-tab" role="tablist">
                    <li class="nav-item" role="presentation">
                        <button class="nav-link active" id="pills-users-tab" data-bs-toggle="pill" data-bs-target="#pills-users" type="button" role="tab" aria-controls="pills-users" aria-selected="true">Users</button>
                    </li>
                    <li class="nav-item" role="presentation">
                        <button class="nav-link" id="pills-projects-tab" data-bs-toggle="pill" data-bs-target="#pills-projects" type="button" role="tab" aria-controls="pills-projects" aria-selected="false">Projects</button>
                    </li>
                    <li class="nav-item" role="presentation">
                        <button class="nav-link" id="pills-manage-projects-tab" data-bs-toggle="pill" data-bs-target="#pills-manage-projects" type="button" role="tab" aria-controls="pills-manage-projects" aria-selected="false">Manage Projects</button>
                    </li>
            
                    </ul>
                    <div class="tab-content" id="pills-tabContent">
                    {/* Users Tab */}
                    <div class="tab-pane fade show active" id="pills-users" role="tabpanel" aria-labelledby="pills-users-tab" tabindex="0">
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
                            <td><i class="fa-solid fa-clone"></i></td>
                            <td><i class="fa-solid fa-file-lines" data-bs-toggle="modal"
                    data-bs-target="#staticBackdrop5"></i></td>
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
                            {usersDiv}
                        </tbody>
                    </table>
                    
                        

                    </div>

                    { /* Projects Tab */}
                    <div class="tab-pane fade" id="pills-projects" role="tabpanel" aria-labelledby="pills-projects-tab" tabindex="0">
                

                 
                    
                    <table class="table table-primary table-hover text-center">
                        <thead>
                            <tr>
                            <th scope="col">ID</th>
                            <th scope="col">Project Name</th>
                            <th scope="col">Status</th>
                            <th scope="col">
                            <i class="fa-solid fa-plus" data-bs-toggle="modal" data-bs-target="#staticBackdrop">
                    </i>
                            </th>
                            <div class="modal fade" id="staticBackdrop" data-bs-backdrop="static" data-bs-keyboard="false" tabindex="-1" aria-labelledby="staticBackdropLabel" aria-hidden="true">
                    <div class="modal-dialog">
                        <div class="modal-content">
                        <div class="modal-header">
                            <h5 class="modal-title" id="staticBackdropLabel">Add Project</h5>
                            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div class="modal-body text-center">
                        <form onSubmit={(e) => handleAddProject(e, addProject, projects)}>
                                <div class="text-start my-3 px-3">
                                    <label for="projectName" class="form-label">Project Name</label>
                                    <input type="text" onChange={(e) => setAddProject(e.target.value)} class="form-control" id="projectName" />
                                </div>
                                {isError && <p>{Error}</p>}
                                <button type="submit" class="btn btn-primary mb-3">Submit</button>
                            </form>
                        </div>
                        </div>
                    </div>
                    </div>

                            </tr>
                        </thead>

                        <tbody>
                            {projectDiv}
                        </tbody>

                    </table>
                    
                    </div>
                    
                    { /* Manage Projects Tab */ }
                    <div class="tab-pane fade" id="pills-manage-projects" role="tabpanel" aria-labelledby="pills-manage-projects-tab" tabindex="0">
                        
                    <table class="table table-primary table-hover text-center">
                        <thead>
                            <tr>
                            <th scope="col">Project Name</th>
                            <th scope="col">Status</th>

                            <th scope="col">
                            <i class="fa-solid fa-plus" data-bs-toggle="modal" data-bs-target="#staticBackdrop3">
                    </i>
                            </th>
                            <div class="modal fade" id="staticBackdrop3" data-bs-backdrop="static" data-bs-keyboard="false" tabindex="-1" aria-labelledby="staticBackdropLabel3" aria-hidden="true">
                    <div class="modal-dialog">
                        <div class="modal-content">
                        <div class="modal-header">
                            <h5 class="modal-title" id="staticBackdropLabel3">Assign Project</h5>
                            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div class="modal-body text-center">
                        <form onSubmit={(e) => handleAddUserProject(e, addUserProject, user._id)}>
                                <div class="text-start my-3 px-3">
                                    <label for="userProject" class="form-label">Project</label>
                                    <select onClick={(e) => setAddUserProject(e.target.value)} class="form-select" name="userProject">
                                    <option selected value="" disabled>
                                    Choose
                                    </option>
                                    {userProjectOptions}
                                    </select>
                                </div>
                                <button type="submit" class="btn btn-primary mb-3">Submit</button>
                            </form>
                        </div>
                        </div>
                    </div>
                    </div>


                            </tr>
                        </thead>

                        <tbody>
                            {userProjectDiv}
                        </tbody>

                    </table>
                    
                    </div>

                 

                    </div>
    
    
            </div>
        );
}
 
export default ManagerView;