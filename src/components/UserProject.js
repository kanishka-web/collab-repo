import React from 'react';

const UserProject = (props) => {
    const {userProjects, id} = props;
    
    // UserProjects of the current user
    const userUserProjects = userProjects.filter((up) => {
        return up.userId === id;
      });
    
    const userProjectDiv = userUserProjects.map((uup) => {
        if (uup.currentStatus === "Active") {
          return (
            <tr>
              <th scope="row">{uup.projectId}</th>
              <td scope="col">{uup.currentStatus}</td>
            </tr>
          );
        }
      });
    
    return (
        <tbody>
            {userProjectDiv}
        </tbody>
        
    )
}
 
export default UserProject;