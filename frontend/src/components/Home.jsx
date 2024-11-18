import React from 'react'
import Hero from '../Home/Hero'
import Trending from '../Home/Trending'
import Devotonal from '../Home/Devotonal'
import Creator from '../Home/Creator'

function Home() {
  return (
    <div>
      <Hero/>
      <Trending/>
      <Devotonal/>
      <Creator/>
    </div>
  )
}

export default Home
