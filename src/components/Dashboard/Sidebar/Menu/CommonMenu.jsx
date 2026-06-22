import React from 'react';
import { FaUserCog } from 'react-icons/fa';
import MenuItem from './MenuItem'
import { MdOutlineAnalytics } from 'react-icons/md';


const CommonMenu = () => {
    return (
        <>
      <MenuItem icon={MdOutlineAnalytics} label='Analytics' address='analytics' />
      
    </>
    );
};

export default CommonMenu;