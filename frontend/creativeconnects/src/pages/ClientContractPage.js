import React, { useState } from "react";
import '../styles/ClientContractPage.css'
import Button from '../components/Botton'
const ClientContractPage = () => {
    const [form, setForm] = useState({
        freelancerName: '',
        freelancerId: '',
        projectTitle: '',
        timePeriod: '',
        budget: '',
        paymentType: 'fiftyFifty',
        milestones: [{ description: '', amount: '' }],
        agreed: false,
      });
    
      const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        setForm((prev) => ({
          ...prev,
          [name]: type === 'checkbox' ? checked : value,
        }));
      };
    
      const handlePaymentTypeChange = (e) => {
        const paymentType = e.target.value;
        setForm((prev) => ({
          ...prev,
          paymentType,
          milestones: paymentType === 'milestone' ? prev.milestones : [{ description: '', amount: '' }],
        }));
      };
    
      const handleMilestoneChange = (index, field, value) => {
        setForm((prev) => {
          const milestones = prev.milestones.map((m, i) =>
            i === index ? { ...m, [field]: value } : m
          );
          return { ...prev, milestones };
        });
      };
    
      const addMilestone = () => {
        setForm((prev) => ({
          ...prev,
          milestones: [...prev.milestones, { description: '', amount: '' }],
        }));
      };
    
      const removeMilestone = (index) => {
        setForm((prev) => ({
          ...prev,
          milestones: prev.milestones.filter((_, i) => i !== index),
        }));
      };
    
      const handleSubmit = (e) => {
        e.preventDefault();
        if (!form.agreed) {
          alert('You must agree to the terms before submitting.');
          return;
        }
        // TODO: send form data to backend or platform API
        console.log('Contract submitted:', form);
        alert('Contract submitted successfully!');
      };
    
      return (
        <div className="contract-container">
          <h1 className="contract-title">Freelancer-Client Contract Agreement</h1>
    
          <div className="policy-section">
  <h2>1. Parties Involved</h2>
  <p>
    This Agreement is made between the <strong>Client</strong> and the <strong>Freelancer</strong> through. Both parties acknowledge that they have the legal capacity to enter into this agreement.
  </p>

  <h2>2. Project Scope</h2>
  <p>
    The Freelancer agrees to perform the services as described in the project listing or mutually agreed proposal. Any modifications to the scope must be approved in writing by both parties.
  </p>

  <h2>3. Payment Terms</h2>
  <p>
    Payment will be processed through the platform using one of the following structures:
    <ul>
      <li><strong>Milestone-Based:</strong> Payments are released upon approval of specific project phases defined and agreed upon by both parties.</li>
      <li><strong>50/50 Model:</strong> 50% of the total project cost is paid upfront, and the remaining 50% upon project completion.</li>
    </ul>
    All payments will be held in escrow and released upon satisfaction of agreed conditions.
  </p>

  <h2>4. Timeline and Deadlines</h2>
  <p>
    The Freelancer will deliver the work within the time frame agreed upon by both parties. Extensions or delays must be communicated in advance. Repeated delays without valid reasons may lead to termination or dispute.
  </p>

  <h2>5. Revisions and Feedback</h2>
  <p>
    The Client is entitled to [insert number] rounds of revisions as per the original agreement. Additional revisions may incur extra charges and must be approved by both parties through the platform.
  </p>

  <h2>6. Confidentiality</h2>
  <p>
    Both the Client and Freelancer agree to maintain strict confidentiality regarding all project details, data, and communications. No information shall be shared with any third party without written consent from the other party.
  </p>

  <h2>7. Intellectual Property & Ownership</h2>
  <p>
    Upon full payment, the Client will receive complete rights, ownership, and intellectual property of the final deliverables, unless stated otherwise in the contract. The Freelancer may retain portfolio rights if explicitly stated.
  </p>

  <h2>8. Platform Usage and Policies</h2>
  <p>
    Both parties agree to adhere to the <strong>Creative Connect</strong>'s terms of service, privacy policy, refund policy, dispute resolution system, and code of conduct. Misuse or violation of platform rules may lead to suspension or legal action.
  </p>

  <h2>9. Dispute Resolution</h2>
  <p>
    In the event of a disagreement, both parties agree to first resolve the issue through the platform’s built-in dispute resolution system. If the issue remains unresolved, further legal proceedings may be considered.
  </p>

  <h2>10. Termination Policy</h2>
  <p>
    Either party may terminate the agreement with valid reason through the platform. In such cases, any pending payments for completed work will be settled according to the agreed terms, and project materials must be returned or handed over.
  </p>

  <h2>11. Legal Compliance</h2>
  <p>
    Both parties declare that the services provided and the usage of the platform comply with all applicable laws, regulations, and ethical standards.
  </p>

  <h2>12. Final Agreement</h2>
  <p>
    By submitting this form, both the Client and Freelancer affirm that they have read, understood, and agreed to all terms and conditions stated in this agreement.
  </p>
</div>
    
          <form onSubmit={handleSubmit}>
            <div className="form-section">
              <h2>Contract Details</h2>
    
              <div className="form-group">
                <label>Freelancer Name</label>
                <input
                  type="text"
                  name="freelancerName"
                  value={form.freelancerName}
                  onChange={handleChange}
                  required
                />
              </div>
    
              <div className="form-group">
                <label>Freelancer ID</label>
                <input
                  type="text"
                  name="freelancerId"
                  value={form.freelancerId}
                  onChange={handleChange}
                  required
                />
              </div>
    
              <div className="form-group">
                <label>Project Title</label>
                <input
                  type="text"
                  name="projectTitle"
                  value={form.projectTitle}
                  onChange={handleChange}
                  required
                />
              </div>
    
              <div className="form-group">
                <label>Time Period</label>
                <input
                  type="text"
                  name="timePeriod"
                  value={form.timePeriod}
                  onChange={handleChange}
                  placeholder="e.g., 4 weeks"
                  required
                />
              </div>
    
              <div className="form-group">
                <label>Budget</label>
                <input
                  type="text"
                  name="budget"
                  value={form.budget}
                  onChange={handleChange}
                  placeholder="e.g., $1000"
                  required
                />
              </div>
    
              <div className="radio-group">
                <label>
                  <input
                    type="radio"
                    name="paymentType"
                    value="fiftyFifty"
                    checked={form.paymentType === 'fiftyFifty'}
                    onChange={handlePaymentTypeChange}
                  />
                  50% at Start, 50% at Completion
                </label>
                <label>
                  <input
                    type="radio"
                    name="paymentType"
                    value="milestone"
                    checked={form.paymentType === 'milestone'}
                    onChange={handlePaymentTypeChange}
                  />
                  Milestone Payment
                </label>
              </div>
    
              {form.paymentType === 'milestone' && (
                <div className="milestones-container">
                  <h3>Milestones</h3>
                  {form.milestones.map((m, idx) => (
                    <div className="milestone-item" key={idx}>
                      <input
                        type="text"
                        placeholder="Description"
                        value={m.description}
                        onChange={(e) => handleMilestoneChange(idx, 'description', e.target.value)}
                        required
                      />
                      <input
                        type="text"
                        placeholder="Amount"
                        value={m.amount}
                        onChange={(e) => handleMilestoneChange(idx, 'amount', e.target.value)}
                        required
                      />
                      <button type="button" onClick={() => removeMilestone(idx)}>
                        Remove
                      </button>
                    </div>
                  ))}
                  <button type="button" onClick={addMilestone} className="add-milestone">
                    Add Milestone
                  </button>
                </div>
              )}
            </div>
    
            <div className="checkbox-group">
              <label>
                <input
                  type="checkbox"
                  name="agreed"
                  checked={form.agreed}
                  onChange={handleChange}
                  required
                />
                I have read and agree with the agreement
              </label>
            </div>
    
            <div className="button-group">
                
              <button type="button" className="back-button" onClick={() => window.history.back()}>
                Back
              </button>
              <Button type="submit" className="submit-button">Submit Agreement</Button>
            </div>
          </form>
        </div>
      );
    };

export default ClientContractPage
