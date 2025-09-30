// import './Preloader.css';
// import React from 'react';

// class Preloader extends React.Component
// {
//     render()
//     {
//         return(
//             <div class="lds-roller"><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div></div>
//         )
//     }
// }
// export default Preloader;

import './Preloader.css';
import React from 'react';
class Preloader extends React.Component
{ render() 
    {
return(
      <div className="lds-roller"><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div></div>
 )
 }
}
export default Preloader;