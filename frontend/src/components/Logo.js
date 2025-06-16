// files general purpose: create reusable logo component

// import React to define component
import React from 'react';
// import styling for react component
import '../styles/Logo.css';

// define functional logo component:
    // default size value: 100
    // no children since it is a logo
function Logo({ size = 100 }) {
    return (
        <img
            // render image located at following destination
            src="/images/avalon-logo.png"
            // provide alternative text for screen readers when image cannot load
            alt="Avalon Logo"
            // apply CSS class logo imported from logo.css file
            className="logo"
            // dynamically set image width using the size prop—the height adjusts automatically to maintain aspect ratio
            style={{ width: size }}
        />
    );
};

// export component so it can be used in other files
export default Logo;

// NOTE: to use this component in other files, you must do two things:
    // 1. add the following import to the top of the file you wish to add it to:
        // import Logo from '../components/Logo';
    // 2. implement the Logo component using this statement:
        // <Logo size={width size} />
        // size: px value that controls width of image
        // height is dynamically updated as the width is changed
        // the logo has the following dimensions: 800 × 456