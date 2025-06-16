// files general purpose: create reusable button component

// import React to define component
import React from 'react';
// import styling for react component
import './Button.css';

// define functional button component:
    // type: defaults to primary if not explicitly specified
    // children: content inside of the button—text for example
    // props: inputs to configure behavior/appearance—onClick for example
function Button({ type = 'primary', children, ...props }) {
    // set className string—if type is secondary, use 'btn btn-secondary', otherwise use 'btn btn-primary'
    const className = type === 'secondary' ? 'btn btn-secondary' : 'btn btn-primary';
    // render button with computed class name, props, and display the children inside the button
    return (
        <button className={className} {...props}>
            {children}
        </button>
    );
}

// export component so it can be used in other files
export default Button;

// NOTE: to use this component in other files, you must do two things:
    // 1. add the following import to the top of the file you wish to add it to:
        // import Button from '../components/Button';
    // 2. implement the Button component using this statement:
        // <Button type="className" props>children</Button>
