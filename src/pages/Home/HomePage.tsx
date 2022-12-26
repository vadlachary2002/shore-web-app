import React from 'react';
import { ErrorBoundary } from '../../components';
import { NavBar } from '../../components';
const HomePage = () => {
    return (
        <ErrorBoundary>
            <div className="home">
                <NavBar />
            </div>
        </ErrorBoundary>
    );
};
export default HomePage;
