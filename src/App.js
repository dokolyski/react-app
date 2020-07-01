import React from 'react';
import './App.css';
import Table from "./components/table";

const App = () => {
    return (
        <div>
            <h4 style={{textAlign: 'center'}}>Sample images: image1.jpg, ..., image7.jpg</h4>
            <Table />
        </div>
    );
}

export default App;

