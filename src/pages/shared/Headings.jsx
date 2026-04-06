import React from 'react';

const Headings = ({children}) => {
    return (
        <div>
            <h2  className="text-3xl font-bold text-center mb-10"> {children}</h2>
           
        </div>
    );
};

export default Headings;