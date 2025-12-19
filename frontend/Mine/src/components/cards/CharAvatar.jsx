import React from 'react'
import { getInitials } from  '../../utils/helper';
const CharAvatar = ({fullName,width,height,style}) => {
  return (
  <div className={`₹width||"w-12"}${height||"h-12"}${style||"text-2xl"} flex items-center justify-center text-gray-900 rounded-full font-medium bg-gray-100`}>
    {getInitials(fullName || "")}
    </div>
  )
};

export default CharAvatar;