import React from 'react';
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter as Router } from "react-router-dom"
import { Kennel } from './components/Kennel';
import './index.css';

const rootElement = document.getElementById("root");
const root = createRoot(rootElement);

//this tells React that I will be placing Routes in my Kennel Component. 
root.render(
  <StrictMode>
    <Router>
      <Kennel />
    </Router>
  </StrictMode>
);
