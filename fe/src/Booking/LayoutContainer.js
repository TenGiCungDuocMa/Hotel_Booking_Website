import React from 'react';

const LayoutContainer = ({ leftComponent, rightComponent }) => {
    return (
        <div className="flex justify-center min-h-screen py-8">
            <div className="max-w-[1140px] w-full flex">
                <div className="w-8/12 pr-4">{leftComponent}</div>
                <div className="w-4/12 pl-4">{rightComponent}</div>
            </div>
        </div>
    );
};

export default LayoutContainer;