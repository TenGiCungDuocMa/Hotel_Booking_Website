// global SCSS file
import './global.scss';

// Refactored LayoutContainer.jsx
import React from 'react';

const LayoutContainer = ({ leftComponent, rightComponent }) => {
    return (
        <div className="layout-container">
            <div className="layout-container__inner">
                <div className="layout-container__left">{leftComponent}</div>
                <div className="layout-container__right">{rightComponent}</div>
            </div>
        </div>
    );
};

export default LayoutContainer;