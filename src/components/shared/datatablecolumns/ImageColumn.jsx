import Image from 'next/image'
import React from 'react'

export default function ImageColumn({row,imageTitle}) {
    const imageUrl=row.getValue(`${imageTitle}`)
    return <Image alt={imageTitle} width={500} height={500} src={imageUrl} className="shrink-0 w-14 h-8 rounded-full"/>
}
