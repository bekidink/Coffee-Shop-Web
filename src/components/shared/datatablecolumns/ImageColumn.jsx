import Image from 'next/image'
import React from 'react'

export default function ImageColumn({row,imageTitle}) {
    const imageUrl=row.getValue(`${imageTitle}`)
    return <Image alt={imageTitle} width={100} height={100} src={imageUrl} className=" w-14 h-8 rounded-full" priority/>
}
