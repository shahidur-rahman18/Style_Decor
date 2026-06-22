/* eslint-disable no-unused-vars */
import { NavLink } from 'react-router'
import Reveal from '../../../Animation/Reveal'

const MenuItem = ({ label, address, icon: Icon }) => {
  return (
   <Reveal>
     <NavLink
      to={address}
      end
      className={({ isActive }) =>
        `flex items-center px-4 py-2 my-5 rounded-xl transition-colors duration-300 transform  hover:bg-[#F3EDE2]  hover:text-gray-700 ${
          isActive ? 'bg-[#DDA23C] rounded-xl text-gray-700' : 'text-gray-600'
        }`
      }
    >
      <Icon className='w-5 h-5' />

      <span className='mx-4 font-medium'>{label}</span>
    </NavLink>
   </Reveal>
  )
}

export default MenuItem
