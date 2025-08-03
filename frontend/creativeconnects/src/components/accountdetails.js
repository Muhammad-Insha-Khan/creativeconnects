import React, { useState } from "react";
import "../styles/AccountDetails.css";
import Button from '../components/Botton'
import JobDescription from "./ProjectProposal";

const AccountDetails = () => {
  
    
    const [field, setField] = useState('')
    const states = {
        First_Name: "Alizain",
        Last_Name: "Saleem",
        Profile_Description: "Experienced WordPress Developer specializing in creating custom, user-friendly websites and e-commerce solutions. With expertise in platforms like Shopify and WordPress, I help businesses establish a strong online presence. From developing interactive product galleries to designing efficient admin panels, I deliver tailored solutions to meet unique client needs. Currently offering web development services to tech companies, online stores, and small businesses in Karachi and beyond.",
        Skills: "WORDPRESS , CSS , HTML",
        Languages: "English , Urdu",
        Portfolio: "https://www.com", // Corrected the URL format
        School: "Stanmore Public School",
        College: "Aga Khan College",
        University: "Sir Syed",
        JobDescription: 'Jobless',
        Experience_Description: "No experiences",
        Level: "Beginner", // Corrected spelling
        Add_Certifications: "https://www.udemylink.com", // Corrected URL format
        Additional_Details: "sdnaibdasiopbdopasbdopasbdasbdopasbdpoasbdopasbdopas",
    };

    const toggleFirstname = () =>{setField( states.First_Name)} ;
    const toggleLast_Name = () => { setField(states.Last_Name) };
    const toggleProfile_Description = () => { setField(states.Profile_Description) };
    const toggleSkills = () => { setField(states.Skills) };
    const toggleLanguages = () => { setField(states.Languages) };
    const togglePortfolio = () => { setField(states.Portfolio) };
    const toggleSchool = () => { setField(states.School) };
    const toggleCollege = () => { setField(states.College) };
    const toggleUniversity = () => { setField(states.University) };
    const toggleJobDescription = () => { setField(states.JobDescription) };
    const toggleExperience_Description = () => { setField(states.Experience_Description) };
    const toggleLevel = () => { setField(states.Level) };
    const toggleAdd_Certifications = () => { setField(states.Add_Certifications) };
    const toggleAdditional_Details = () => { setField(states.Additional_Details) };
    console.log(field);

   
  return (
    <div className="container">
        <div className="profile-pic">
            <label htmlFor="profile-pic-input">
                <img src="placeholder.jpg" alt="Profile Picture" id="profile-pic-preview"></img>
            </label>
            <input type="file" id="profile-pic-input" name="profile-pic" accept="image/*">
            </input>
        </div>

            
            <h2>Personal Information</h2>
            <div className="form-row">
            {field === 'Alizain' ? (
                <div className="form-group">
                <div className="detials">
                <label >First Name</label>
                <button className="circle-button" onClick={toggleFirstname}>+</button>
               </div>
               <input type="text" id="first-name" name="first-name" ></input>
               <button className="oval-button" onClick={toggleFirstname}>Save</button>

                    </div>
            ) : (
                (<div className="form-group">
                    <div className="detials">
                    <label >First Name</label>
                    <button className="circle-button" onClick={toggleFirstname}>+</button>
                    
                    </div>
                    <div class="college-box">
                    {states.First_Name}
                    </div>
                    </div>)
            )}
            {field === 'Saleem' ? (
                <div className="form-group">
                <div className="detials">
                <label >Last Name</label>
                <button className="circle-button" onClick={toggleLast_Name}>+</button>
                </div>
                <input type="text" id="last-name" name="last-name" ></input>
                <button className="oval-button" onClick={toggleFirstname}>Save</button>

            </div>
            ) : (
                (<div className="form-group">
                    <div className="detials">
                    <label >Last Name</label>
                    <button className="circle-button" onClick={toggleLast_Name}>+</button>
                    </div>
                    <div class="college-box">
                    {states.Last_Name}
                    </div>
                </div>)
            )}
            </div>
            {field === 'Experienced WordPress Developer specializing in creating custom, user-friendly websites and e-commerce solutions. With expertise in platforms like Shopify and WordPress, I help businesses establish a strong online presence. From developing interactive product galleries to designing efficient admin panels, I deliver tailored solutions to meet unique client needs. Currently offering web development services to tech companies, online stores, and small businesses in Karachi and beyond.' ? (
                <div className="form-group">
                <div className="detials">
                <label >Profile Description</label>
                <button className="circle-button" onClick={toggleProfile_Description}>+</button>
                </div>
                <textarea id="profile-description" name="profile-description" rows="4" ></textarea>
                <button className="oval-button" onClick={toggleFirstname}>Save</button>
            </div>
            ) : (
                (<div className="form-group">
                    <div className="detials">
                    <label >Profile Description</label>
                    <button className="circle-button" onClick={toggleProfile_Description}>+</button>
                    </div>
                    <div class="college-box">
                    {states.Profile_Description}
                    </div>
                </div>)
            )}
               <div className='Divider'></div>
            
               {field === 'WORDPRESS , CSS , HTML' ? (
                <div>
                <div className="detials">
                    <h2>Skills</h2>
                    <button className="circle-button" onClick={toggleSkills}>+</button>
                    </div>
                    <div className="form-group">
                        <label >Select Skills</label>
                        <select id="skills" name="skills" >
                            <option value="html">HTML</option>
                            <option value="css">CSS</option>
                            <option value="javascript">JavaScript</option>
                            <option value="python">Python</option>
                        </select>
                        <button className="oval-button" onClick={toggleFirstname}>Save</button>

                    </div>
                    </div>
            ) : (
                (
                <div>
                <div className="detials">
                    <h2>Skills</h2>
                    <button className="circle-button" onClick={toggleSkills}>+</button>
                    </div>
                    <div className="form-group">
                    <div class="college-box">
                        {states.Skills}
                        </div>
                    </div>
                    </div>)
            )}
            <div className='Divider'></div>
            {field === 'English , Urdu' ? (
                <div>
                <div className="detials">
                <h2>Languages</h2>
                <button className="circle-button" onClick={toggleLanguages}>+</button>
                </div>
                <div className="form-group">
                    <label >Select Languages</label>
                    <select id="languages" name="languages" >
                        <option value="english">English</option>
                        <option value="urdu">Urdu</option>
                        <option value="spanish">Spanish</option>
                        <option value="french">French</option>
                    </select>
                    <button className="oval-button" onClick={toggleFirstname}>Save</button>

                </div>
                </div>
            ) : (
                (
                    <div>
                    <div className="detials">
                    <h2>Languages</h2>
                    <button className="circle-button" onClick={toggleLanguages}>+</button>
                    </div>
                    <div className="form-group">
                    <div class="college-box">
                       {states.Languages}
                       </div>
                    </div>
                    </div>)
            )}
            
            <div className='Divider'></div>
            {field === 'https://www.com' ? (
                <div>
                    <div className="detials">
                <h2>Portfolio</h2>
                        <button className="circle-button" onClick={togglePortfolio}>+</button>
                        </div>
                <div className="form-group">
                    <label >Portfolio Links</label>
                    <input type="url" id="portfolio" name="portfolio" placeholder="Enter a portfolio link"></input>
                </div>
                <div className="form-group">
                    <label >Upload Portfolio Image</label>
                    <input type="file" id="portfolio-image" name="portfolio-image" accept="image/*"></input>
                </div>
                <button className="oval-button" onClick={toggleFirstname}>Save</button>
                </div>
                
            ) : (
                (
                    <div>
                    <div className="detials">
            <h2>Portfolio</h2>
                    <button className="circle-button" onClick={togglePortfolio}>+</button>
                    </div>
                    <div class="college-box">
            {states.Portfolio}
            </div>
            </div>)
            )}
            
            <div className='Divider'></div>

            <h2>Education Details</h2>
            {field === 'Stanmore Public School' ? (
                <div className="form-group">
                <div className="detials">
                    <label >School</label>
                            <button className="circle-button" onClick={toggleSchool}>+</button>
                            </div>
                    <textarea id="school" name="school" rows="2" placeholder="Enter school details"></textarea>
                    <button className="oval-button" onClick={toggleFirstname}>Save</button>

                </div>
            ) : (
                (
                    <div className="form-group">
                    <div className="detials">
                        <label >School</label>
                                <button className="circle-button" onClick={toggleSchool}>+</button>
                                </div>
                                <div class="college-box">
                                {states.School}   
                                </div>                 
                    </div>)
            )}
            {field === 'Aga Khan College' ? (
                <div className="form-group">
                <div className="detials">
                    <label >College</label>
                            <button className="circle-button" onClick={toggleCollege}>+</button>
                            </div>
                    <textarea id="college" name="college" rows="2" placeholder="Enter college details"></textarea>
                    <button className="oval-button" onClick={toggleFirstname}>Save</button>

                </div>
            ) : (
                (
                    <div className="form-group">
            <div className="detials">
                <label >College</label>
                        <button className="circle-button" onClick={toggleCollege}>+</button>
                        </div>
                        <div class="college-box">
                        {states.College}
                        </div>
            </div>)
            )}
            {field === 'Sir Syed' ? (
                <div className="form-group">
                <div className="detials">
    
                    <label >University</label>
                            <button className="circle-button" onClick={toggleUniversity}>+</button>
                            </div>
                    <textarea id="university" name="university" rows="2" placeholder="Enter university details"></textarea>
                    <button className="oval-button" onClick={toggleFirstname}>Save</button>
                </div>
            ) : (
                (
                    <div className="form-group">
            <div className="detials">

                <label >University</label>
                        <button className="circle-button" onClick={toggleUniversity}>+</button>
                        </div>
                        <div class="college-box">
                        {states.University}
                        </div>
            </div>)
            )}
            
            
            <div className='Divider'></div>
            
            <h2>Job Details</h2>
            {field === 'Jobless' ? (
                <div className="form-group">
                <div className="detials">
    
                    <label >Add Job Details</label>
                            <button className="circle-button" onClick={toggleJobDescription}>+</button>
                            </div>
                    <textarea id="job" name="job" rows="4" placeholder="Enter job details, positions held, etc."></textarea>
                    <button className="oval-button" onClick={toggleFirstname}>Save</button>
                </div>
            ) : (
                (
                    <div className="form-group">
            <div className="detials">

                <label >Add Job Details</label>
                        <button className="circle-button" onClick={toggleJobDescription}>+</button>
                        </div>
                        <div class="college-box">
                        {states.JobDescription}
                        </div>
            </div>)
            )}
            <div className='Divider'></div>
            {field === 'No experiences' ? (
                <div>
                <div className="detials">
                <h2>Experience</h2>
                        <button className="circle-button" onClick={toggleExperience_Description}>+</button>
                        </div>
                <div className="form-group">
                    <label >Experience Description</label>
                    <textarea id="experience" name="experience" rows="3" placeholder="Enter experience details"></textarea>
                    <button className="oval-button" onClick={toggleFirstname}>Save</button>

                </div>
                </div>
            ) : (
                (<div>
                    <div className="detials">
            <h2>Experience</h2>
                    <button className="circle-button" onClick={toggleExperience_Description}>+</button>
                    </div>
            <div className="form-group">
                <label >Experience Description</label>
                <div class="college-box">
                {states.Experience_Description}
                    </div>
            </div>
            </div>)
            )}

            {field === 'Beginner' ? (
                <div className="form-group">
                <div className="detials">
                    <label >Experience Level</label>
                    <button className="circle-button" onClick={toggleLevel}>+</button>
                    </div>
                    <select id="experience-level" name="experience-level">
                        <option value="beginner">Beginner</option>
                        <option value="intermediate">Intermediate</option>
                        <option value="expert">Expert</option>
                    </select>
                    <button className="oval-button" onClick={toggleFirstname}>Save</button>

                </div>
            ) : (
                (<div className="form-group">
                    <div className="detials">
                        <label >Experience Level</label>
                        <button className="circle-button" onClick={toggleLevel}>+</button>
                        </div>
                        <div class="college-box">
                       {states.Level}
                       </div>
                    </div>)
            )}
            <div className='Divider'></div>
            {field === 'https://www.udemylink.com' ? (
                <div>
                <div className="detials">
                <h2>Certifications</h2>
                        <button className="circle-button" onClick={toggleAdd_Certifications}>+</button>
                        </div>
                <div className="form-group">
                    <label >Add Certifications</label>
                    <input type="text" id="certifications" name="certifications" placeholder="Enter certification name"></input>
                </div>
                <div className="form-group">
                    <label >Upload Certification Proof</label>
                    <input type="file" id="certification-proof" name="certification-proof" accept="image/*"></input>
                    <button className="oval-button" onClick={toggleFirstname}>Save</button>
                </div>
                </div>
            ) : (
                (<div>
                    <div className="detials">
                    <h2>Certifications</h2>
                            <button className="circle-button" onClick={toggleAdd_Certifications}>+</button>
                            </div>
                            <div class="college-box">
                    {states.Add_Certifications}
                    </div>
                    </div>)
            )}
            
            <div className='Divider'></div>
            {field === 'sdnaibdasiopbdopasbdopasbdasbdopasbdpoasbdopasbdopas' ? (
                <div>
                <div className="detials">
                    <h2>Additional Details</h2>
                            <button className="circle-button" onClick={toggleAdditional_Details}>+</button>
                            </div>
                    <div className="form-group">
                        <label >Other Information</label>
                        <textarea id="additional-details" name="additional-details" rows="4" placeholder="Enter any other relevant information"></textarea>
                        <button className="oval-button" onClick={toggleFirstname}>Save</button>

                    </div>
                    </div>
            ) : (
                (
                <div>
                <div className="detials">
                    <h2>Additional Details</h2>
                            <button className="circle-button" onClick={toggleAdditional_Details}>+</button>
                            </div>
                    <div className="form-group">
                        <label >Other Information</label>
                        <div class="college-box">
                        {states.Additional_Details}
                        </div>
                    </div>
                    </div>)
            )}
            

            
    </div>
  );
};

export default AccountDetails;
