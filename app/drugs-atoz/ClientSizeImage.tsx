'use client'

import Image from 'next/image'
import React from 'react'

const ClientSizeImage = ({drug}: any) => {
    console.log(" i am browser side image");
  return (
    <Image
    src={drug.images[0]}
    alt={drug.name}
    fill
    className="object-cover"
/>
  )
}

export default ClientSizeImage