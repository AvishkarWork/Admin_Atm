import React, { useState, useEffect } from "react";
import { Link, useNavigate,useParams  } from "react-router-dom";
import {theme } from "antd";
import "./home.css";
import axios from "axios";
import Cookies from "js-cookie";
import { Doughnut, Pie } from "react-chartjs-2";
import { Chart, ArcElement } from "chart.js";
import "chartjs-plugin-datalabels";
Chart.register(ArcElement);


const AtmDetails = () => {
const { id } = useParams();
console.log(">>>>" + id);
  const navigate = useNavigate();
  const token = Cookies.get("jwt");

  const [aData, setAData] = useState({});

  const getAtmDetails = async () => {
    try {
      const result = await axios.get("http://localhost:5000/admin/atm/:id", {
        headers: { Authorization: `Bearer ${token}` },
      });

      if (result.data.status === 405) {
        alert("Expired Token");
        navigate("/");
      } else if (result.data.status === 200) {
        setAData(result.data.data[0]);
      } else {
        alert("Something went wrong");
        navigate("/");
      }
    } catch (error) {
      console.log(error);
      return null;
    }
  };

  useEffect(() => {
    getAtmDetails();
  }, []);

  const {
    token: { colorBgContainer },
  } = theme.useToken();

  const doData = {
    labels: ["Red", "Blue", "Yellow", "Green"],
    datasets: [
      {
        data: [aData.n_100, aData.n_200, aData.n_500, aData.n_2000],
        backgroundColor: ["#FF6384", "#36A2EB", "#FFCE56", "#4CAF50"],
        hoverBackgroundColor: ["#FF6384", "#36A2EB", "#FFCE56", "#4CAF50"],
      },
    ],
  };
  const options = {
    plugins: {
      datalabels: {
        // Use the datalabels plugin
        display: true,
        color: "#fff",
        formatter: (value, context) => {
          return `${
            context.chart.data.labels[context.dataIndex]
          }: ${value} units`;
        },
      },
    },
  };
  return (
    <div
      className="cont"
      style={{
        padding: 24,
        background: colorBgContainer,
      }}
    >
      <div className="dataCont">
        <div className="sstatus">
          <h3 style={{ textAlign: "center" }}>System Status</h3>
          {aData ? (
            <div className="atm_data">
              <div className="gen">
                <h5>ATM ID: {aData.atm_id}</h5>
                <h5>Status: {aData.status === "on" ? "ONLINE" : "OFFLINE"}</h5>
                <h5>Location: {String(aData.location).toUpperCase()}</h5>
                <h5>Branch ID: {String(aData.branch_id).toUpperCase()}</h5>
              </div>
              <div className="deno">
                <h5>100 Notes: {aData.n_100}</h5>
                <h5>200 Notes: {aData.n_200}</h5>
                <h5>500 Notes: {aData.n_500}</h5>
                <h5>2000 Notes: {aData.n_2000}</h5>
              </div>
            </div>
          ) : (
            <div>No data</div>
          )}
        </div>
        <div className="chartCont">
          <Pie data={doData} options={options} />
        </div>
      </div>
    </div>
  );
};

export default AtmDetails;
