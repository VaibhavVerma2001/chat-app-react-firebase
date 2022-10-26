import React from 'react';
import {signOut} from 'firebase/auth';
import { auth } from '../firebase';

function Navbar() {
  return (
    <div className='navbar'>
      <span className="logo">Lama Chat</span>
      <div className="user">
        <img src="https://pbs.twimg.com/media/FaNasBqUcAEmsgj.jpg" alt="" />
        <span>John</span>
        <button onClick={()=>signOut(auth)}>logout</button>
      </div>
    </div>
  )
}

export default Navbar;
