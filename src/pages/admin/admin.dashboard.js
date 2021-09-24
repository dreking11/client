import React from "react";
import AdminNav from "../../components/Nav/AdminNav"


const AdminDashboard = () => {
  
  return (
    <div className="container-fluid">
      <div className="row">
        <div className="col-md-2">
          <AdminNav />
        </div>
        
        <div className="col">
            <h4>Admin DashBoard</h4>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
