import React, { useEffect, useState } from "react";
import Cookies from "universal-cookie";
import axios from "axios";
import UserView from "./UserView";
import ManagerView from "./ManagerView";
import AdminView from "./AdminView";
import fillWeeklyData from "./FillWeeklyData";

const Dashboard = () => {
  // Cookie for user
  const cookies = new Cookies();

  const UserCookie = cookies.get("user");
  // cookies.remove('UserCookie');

  // If cookie does not exist, redirect to login page
  if (UserCookie === undefined) {
    window.location.href = "/login";
  }

  // For fetching data from API
  const [loading, setLoading] = useState(false);
  const [user, setUser] = useState(null);
  const [users, setUsers] = useState(null);
  const [managers, setManagers] = useState(null);
  const [projects, setProjects] = useState(null);
  const [userProjects, setUserProjects] = useState(null);
  const [teams, setTeams] = useState(null);
  const [teamMembers, setTeamMembers] = useState(null);
  const [weeklyData, setWeeklyData] = useState(null);
  const [weeklyEntry, setWeeklyEntry] = useState(null);

  // Functuon for handling Logout
  const handleLogOut = () => {
    cookies.remove("user");
    window.location.reload(false);
  };



  useEffect(() => {
    // Fetching data from API
    document.title = "Dashboard";
    axios
      .get("https://adensty-user-projects.onrender.com/users/" + UserCookie)
      .then((res) => {
        //console.log(res.data);
        setUser(res.data);
      });

    axios
      .get("https://adensty-user-projects.onrender.com/users")
      .then((res) => {
        //console.log(res.data);
        setUsers(res.data);
      });

    axios
      .get("https://adensty-user-projects.onrender.com/managers")
      .then((res) => {
        //console.log(res.data);
        setManagers(res.data);
      });

    axios
      .get("https://adensty-user-projects.onrender.com/projects")
      .then((res) => {
        //console.log(res.data);
        setProjects(res.data);
      });
    axios
      .get("https://adensty-user-projects.onrender.com/userprojects")
      .then((res) => {
        //console.log(res.data);
        setUserProjects(res.data);
      });

    axios
      .get("https://adensty-user-projects.onrender.com/teams")
      .then((res) => {
        //console.log(res.data);
        setTeams(res.data);
      });

    axios
      .get("https://adensty-user-projects.onrender.com/teammembers")
      .then((res) => {
        //console.log(res.data);
        setTeamMembers(res.data);
      });

    axios
      .get("https://adensty-user-projects.onrender.com/weeklydata")
      .then((res) => {
        //console.log(res.data);
        setWeeklyData(res.data);
      });

    axios
      .get("https://adensty-user-projects.onrender.com/weeklyentry")
      .then((res) => {
        //console.log(res.data);
        setWeeklyEntry(res.data);
      });

    setLoading(true);
  }, [users]);

  // Function for adding a project to the database
  const onAddProject = (project) => {
    axios
      .post("https://adensty-user-projects.onrender.com/projects", {
        name: project,
        createdBy: user.email,
        currentStatus: "Active",
      })
      .then((res) => {
        console.log(res);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  // Function for adding a user
  const onAddUser = (user, email, manager, role) => {
      axios
        .post("https://adensty-user-projects.onrender.com/users", {
          name: user,
          email: email,
          managerId: manager,
          role: role,
          currentStatus: "Active",
        })
        .then((res) => {
          console.log(res);
        })
        .catch((err) => {
          console.log(err);
        });
  };

  // Function for updating a user
  const onUpdateUser = (user, manager, role, status, id) => {
      axios
        .put("https://adensty-user-projects.onrender.com/users/" + id, {
          name: user,
          role: role,
          managerId: manager,
          currentStatus: status        
        })
        .then((res) => {
          console.log(res);
        })
        .catch((err) => {
          console.log(err);
        });
  };

  // Function for assigning a project
  const onAssignProject = (project, userId) => {
    var check = 0;
    var projectId = "";
    userProjects.some((up) => {
      if (
        project === up.projectId &&
        userId === up.userId &&
        up.currentStatus === "Removed"
      ) {
        check = 1;
        projectId = up._id;
      }
    });
    if (check === 0) {
      axios
        .post("https://adensty-user-projects.onrender.com/userprojects", {
          projectId: project,
          userId: user._id,
          currentStatus: "Active",
        })
        .then((res) => {
          console.log(res);
        })
        .catch((err) => {
          console.log(err);
        });
    } else {
      axios
        .put(
          "https://adensty-user-projects.onrender.com/userprojects/" +
            projectId,
          {
            currentStatus: "Active",
          }
        )
        .then((res) => {
          console.log(res);
        })
        .catch((err) => {
          console.log(err);
        });
    }
  };

  // Function for unassigning a project
  const onUnassignProject = (e, project, userId) => {
    e.preventDefault();
    var check = 0;
    var projectId = "";
    userProjects.some((up) => {
      if (project === up.projectId && userId === up.userId) {
        check = 1;
        projectId = up._id;
      }
    });
    axios
      .put(
        "https://adensty-user-projects.onrender.com/userprojects/" + projectId,
        {
          currentStatus: "Removed",
        }
      )
      .then((res) => {
        console.log(res);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  // Function for updating project
  const onUpdateProject = (e, status, id) => {
    e.preventDefault();
    axios
      .put("https://adensty-user-projects.onrender.com/projects/" + id, {
        currentStatus: status,
      })
      .then((res) => {
        console.log(res);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <div class="dashboard">
      <div class="row justify-content-center text-center p-3 m-3">
        <div class="col-8">
          <p class="fs-1">Weekly Data</p>
        </div>
        <div class="col-4">
          <a href="/Report"><button type="button" class="btn btn-primary m-3">
            Generate Report </button></a>
         
          <button
            type="button"
            class="btn btn-primary m-3"
            onClick={(e) => handleLogOut()}
          >
            Logout
          </button>
        </div>
      </div>
      {/* Check role of the user and and render the required view*/}
      {user && projects && userProjects && user.role === "User" && (
        <UserView
          user={user}
          projects={projects}
          userProjects={userProjects}
          onAssignProject={onAssignProject}
          onUnassignProject={onUnassignProject}
          weeklyData={weeklyData}
          weeklyEntry={weeklyEntry}
        />
      )}
      {user && users && projects && userProjects && user.role === "Manager" && (
        <ManagerView
          user={user}
          users={users}
          projects={projects}
          userProjects={userProjects}
          onAddProject={onAddProject}
          onUpdateProject={onUpdateProject}
          onAssignProject={onAssignProject}
          onUnassignProject={onUnassignProject}
        />
      )}
      {user && users && projects && userProjects && managers && user.role === "Admin" && (
        <AdminView
          user={user}
          users={users}
          projects={projects}
          managers={managers}
          userProjects={userProjects}
          onAddProject={onAddProject}
          onUpdateProject={onUpdateProject}
          onAddUser={onAddUser}
          onUpdateUser={onUpdateUser}
          onAssignProject={onAssignProject}
          onUnassignProject={onUnassignProject}
        />
      )}
    </div>
  );
};

export default Dashboard;
