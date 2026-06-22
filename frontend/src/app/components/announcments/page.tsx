import "./page.css";
import React from "react";  
import Navbar from "../Navbar/navbar";
import Menu from "../Menu/Menu";
export default function Page(){

    return (
      <>
    
<Navbar />
<Menu />  
<div className="announcements">
  <div className="header">
    <h1>Announcements</h1>
    <span>View All</span>
  </div>

  <div className="announcement-list">
    
    <div className="announcement sky">
      <div className="announcement-header">
        <h2>School Holiday</h2>
        <span className="date">15/06/2026</span>
      </div>
      <p>No classes next Monday.</p>
    </div>

    <div className="announcement purple">
      <div className="announcement-header">
        <h2>New Exam Schedule</h2>
        <span className="date">10/06/2026</span>
      </div>
      <p>The exam calendar has been updated.</p>
    </div>

    <div className="announcement yellow">
      <div className="announcement-header">
        <h2>Science Fair</h2>
        <span className="date">05/06/2026</span>
      </div>
      <p>Registration is now open.</p>
    </div>

  </div>
</div>
</>)}