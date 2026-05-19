import { useEffect, useState } from "react";
import axios from "axios";

function ComplaintList() {

  const [complaints, setComplaints] = useState([]);
  const [searchLocation, setSearchLocation] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("");

  const BASE_URL =
    "https://ai-complaint-backend-avcn.onrender.com";

  useEffect(() => {

    fetchComplaints();

  }, []);

  const fetchComplaints = async () => {

    try {

      const res = await axios.get(
        `${BASE_URL}/api/complaints`
      );

      setComplaints(res.data);

    } catch (error) {
      console.log(error);
    }
  };

  const updateStatus = async (id) => {

    try {

      const token = localStorage.getItem("token");

      await axios.put(
        `${BASE_URL}/api/complaints/${id}`,
        {
          status: "Resolved"
        },
        {
          headers: {
            Authorization: token
          }
        }
      );

      alert("Complaint Resolved ✅");

      fetchComplaints();

    } catch (error) {
      console.log(error);
    }
  };

  const logout = () => {

    localStorage.removeItem("token");

    window.location.href = "/login";
  };

  const filteredComplaints = complaints.filter((complaint) => {

    return (

      complaint.location
        .toLowerCase()
        .includes(searchLocation.toLowerCase())

      &&

      complaint.category
        .toLowerCase()
        .includes(categoryFilter.toLowerCase())
    );
  });

  return (

    <div
      style={{
        padding: "40px",
        position: "relative"
      }}
    >

      <button
        onClick={logout}
        className="logout-btn"
      >
        Logout
      </button>

      <h1
        style={{
          textAlign: "center",
          color: "#7b2cbf",
          fontSize: "45px",
          marginBottom: "30px"
        }}
      >
        Complaint List
      </h1>

      <div
        style={{
          display: "flex",
          gap: "20px",
          marginBottom: "30px"
        }}
      >

        <input
          type="text"
          placeholder="Search by Location"
          value={searchLocation}
          onChange={(e) =>
            setSearchLocation(e.target.value)
          }
          className="input"
        />

        <input
          type="text"
          placeholder="Filter by Category"
          value={categoryFilter}
          onChange={(e) =>
            setCategoryFilter(e.target.value)
          }
          className="input"
        />

      </div>

      {
        filteredComplaints.map((complaint) => (

          <div
            key={complaint._id}

            style={{
              background: "white",
              padding: "25px",
              borderRadius: "20px",
              marginBottom: "25px",
              boxShadow:
                "0px 5px 15px rgba(0,0,0,0.1)"
            }}
          >

            <h2 style={{ color: "#7b2cbf" }}>
              {complaint.title}
            </h2>

            <p>
              {complaint.description}
            </p>

            <p>
              <b>Category:</b> {complaint.category}
            </p>

            <p>
              <b>Location:</b> {complaint.location}
            </p>

            <p>

              <b>Status:</b>

              {
                complaint.status === "Resolved"

                  ? (

                    <span
                      style={{
                        color: "green",
                        fontWeight: "bold",
                        marginLeft: "10px"
                      }}
                    >
                      ✅ Resolved
                    </span>
                  )

                  : (

                    <span
                      style={{
                        color: "orange",
                        fontWeight: "bold",
                        marginLeft: "10px"
                      }}
                    >
                      Pending
                    </span>
                  )
              }

            </p>

            {
              complaint.status !== "Resolved"

                ? (

                  <button
                    onClick={() =>
                      updateStatus(complaint._id)
                    }
                    className="button"
                  >
                    Mark Resolved
                  </button>
                )

                : (

                  <button
                    className="button"
                    style={{
                      background: "green",
                      cursor: "default"
                    }}
                    disabled
                  >
                    Complaint Resolved ✅
                  </button>
                )
            }

          </div>
        ))
      }

    </div>
  );
}

export default ComplaintList;