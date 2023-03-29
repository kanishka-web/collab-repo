import React, { Component } from 'react';
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import './App.css';
import Dashboard from './components/Dashboard';
import Login from './components/Login';
import FillWeeklyData from './components/FillWeeklyData';
import Report from './components/Report';

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      savedData: []
    };

    this.handleSaveData = this.handleSaveData.bind(this);
  }

  handleSaveData(data) {
    this.setState({
      savedData: data
    });
  }

  render() {
    const { savedData } = this.state;

    return (
      <div className="App">
        <BrowserRouter>
          <Routes>
            <Route exact path="/" element={<Dashboard />} />
            <Route exact path="/login" element={<Login />} />
            <Route path="*" element={<Navigate to="/" />} />
            <Route
              path="/FillWeeklyData"
              element={<FillWeeklyData onSaveData={this.handleSaveData} />}
            />
            <Route path="/Report" element={<Report data={savedData} />} />
          </Routes>
        </BrowserRouter>
      </div>
    );
  }
}

export default App;
