import {createTheme} from "@mui/material";
import React from 'react'
import ChartPerYear from '../components/Chart/ChartPerYear'
import CreateDocument from "../components/CreateDocument/CreateDocument";
import Layout from "../components/Layout/Layout";


const mdTheme = createTheme();


const Dashboard = () => {

  return (
    <Layout>
      <ChartPerYear/>
      <CreateDocument/>
    </Layout>

  );
};

export default Dashboard;
