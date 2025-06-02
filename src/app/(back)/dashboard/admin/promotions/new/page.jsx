"use client"

import FormHeader from '@/components/backoffice/FormHeader'
import NewBannerForm from '@/components/backoffice/NewBannerForm'

import React, { useState } from 'react'

const NewBanner = () => {
  
  
    return (
    <div>
     <FormHeader title={"New Banner"}/>
    <NewBannerForm/>
    </div>
  )
}

export default NewBanner
