import React from 'react';

const Layout = ({title, description, children}) => {
    return ( 
        <>
        <title>{ title ? title + " - React Boilerplate" : "React.js Boilerplate" }</title>
        <meta name = "description" content={ description || "React.js Boilerplate" } />
        <main className="home">
            {children}
        </main>
        </>
     );
}
 
export default Layout;