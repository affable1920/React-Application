import React, { useEffect, useState } from "react";
import { collection, getDocs } from "firebase/firestore";
import auth from "../services/auth";
import { MdOutlineArrowDropDown } from "react-icons/md";
import { NavLink } from "react-router-dom";

const TeamComponent = () => {
  const [teams, setTeams] = useState([]);
  const [showDetails, setShowDetails] = useState(false);
  useEffect(() => {
    async function getTeams() {
      const teamsRef = await getDocs(collection(auth.database, "teams"));
      let teamsToBe = [];
      teamsRef.forEach((team) => teamsToBe.push(team.data()));
      setTeams(teamsToBe);
    }
    getTeams();
  }, []);

  function handleMemberDetails() {
    // setShowDetails((prev) => !prev);
  }

  return (
    <div className="teams-section">
      {teams.map((team) => (
        <article className="team" key={team.name}>
          <h3 className="team-title">{team.name}</h3>
          <div className="team-members-section">
            <h6>These are the members of this team</h6>
            {team.members.map((m) => (
              <article className="team-member">
                <header>
                  <h5>{m.username}</h5>
                  <MdOutlineArrowDropDown
                    style={{ cursor: "pointer" }}
                    onClick={handleMemberDetails()}
                  />
                </header>
                {showDetails && (
                  <div className="member-details">
                    <p>{m.role}</p>
                    <p>{m.email}</p>
                    <p>{m.phoneNumber || "Not Set"}</p>
                  </div>
                )}
              </article>
            ))}
          </div>
        </article>
      ))}
      <NavLink to="/teamform">
        <button className="btn btn-primary mt-5">Create a new team</button>
      </NavLink>
    </div>
  );
};

export default TeamComponent;
