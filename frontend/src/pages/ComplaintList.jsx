import { useEffect, useState } from "react";
import axios from "axios";

function ComplaintList() {

  const [complaints, setComplaints] = useState([]);

  useEffect(() => {

    fetchComplaints();

  }, []);

  const fetchComplaints = async () => {

    try {

      const res = await axios.get(
        "http://localhost:5000/api/complaints"
      );

      setComplaints(res.data);

    } catch (error) {
      console.log(error);
    }
  };

  const updateStatus = async (id) => {

    try {

      await axios.put(
        `http://localhost:5000/api/complaints/${id}`,
        {
          status: "Resolved"
        }
      );

      fetchComplaints();

    } catch (error) {
      console.log(error);
    }
  };

  return (

    <div
      style={{
        padding: "40px"
      }}
    >

      <h1
        style={{
          textAlign: "center",
          color: "#7b2cbf",
          fontSize: "45px",
          marginBottom: "40px"
        }}
      >
        Complaint List
      </h1>

      {
        complaints.map((complaint) => (

          <div
            key={complaint._id}

            style={{
              background: "white",
              padding: "25px",
              borderRadius: "20px",
              marginBottom: "25px",
              boxShadow: "0px 5px 15px rgba(0,0,0,0.1)"
            }}
          >

            <h2 style={{ color: "#7b2cbf" }}>
              {complaint.title}
            </h2>

            <p>
              {complaint.description}
            </p>

            <p>
              <b>Status:</b> {complaint.status}
            </p>

            <p>
              <b>Location:</b> {complaint.location}
            </p>

            <button
              onClick={() => updateStatus(complaint._id)}
              className="button"
            >
              Mark Resolved
            </button>

          </div>
        ))
      }

    </div>
  );
}

export default ComplaintList;