import React, { useState } from 'react'
import ProjectProposal from '../components/ProjectProposal'
import JobDescription from '../components/JobDescription' // Ensure correct import
import '../styles/Proposal.css'

const Proposal = () => {
  const [proposal, setProposal] = useState("ProjectProposal");

  const toggleJob = () => setProposal("JobDescription");
  const toggleProposal = () => setProposal("ProjectProposal");


  return (
    <div className='Proposal'>
      <div className="Proposalcontainer">
        <div className="Proposalcolumn">
          <h2 onClick={toggleProposal} className="ProjectProposalHeading">
            ProjectProposal s
          </h2>
        </div>
        <div className="Proposaldivider"></div>
        <div className="Proposalcolumn">

          <h2 onClick={toggleJob} className="JobProposalHeading">
            JobProposal
          </h2>
        </div>
      </div>


      <div className='ProposalDivider'></div>
      {proposal === "ProjectProposal" && <ProjectProposal />}
      {proposal === "JobDescription" && <JobDescription />}
    </div>
  );
}

export default Proposal;
