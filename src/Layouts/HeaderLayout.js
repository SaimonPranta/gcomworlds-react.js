import React from 'react';
// import Header from '../Shades/Header/Header';
import Header from "../Shades/Header/index";


const HeaderLayout = ({children}) => {
    return (
        <main>
            <Header />
            {
                children
            }
        </main>
    );
};

export default HeaderLayout;