import React from 'react'
import UserNavbar from '../components/UserNavbar'
import FeedCard from '../components/feedCard'
import feed from '../assetes/Dairy/img1.jpg'
import feed2 from '../assetes/Dairy/img3.avif'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons';
import { useNavigate } from 'react-router-dom'

function CowFeed() {
  const navigate = useNavigate();
  return (
    <div >
        <UserNavbar/>
        <div className="back-arrow position-absolute top-5 start-0 p-3">
        <FontAwesomeIcon icon={faArrowLeft} size="2x" onClick={() => navigate(-1)} style={{ cursor: 'pointer' }} />
      </div>
      <h2 className='mt-5 p-3 text-center'>Check The <strong>Feed</strong> Availability Here</h2>
        <div className="container d-flex flex-wrap">
            <FeedCard  feedName="Corn-fed" imageUrl={feed} stock="100" status=""/>
            <FeedCard  feedName="Corn-fed" imageUrl={feed2} stock="100" status=""/>
            <FeedCard  feedName="Corn-fed" imageUrl={feed} stock="100" status=""/>
            <FeedCard  feedName="Corn-fed" imageUrl={feed} stock="100" status=""/>
            <FeedCard  feedName="Corn-fed" imageUrl={feed} stock="100" status=""/>
        </div>
    </div>
  )
}

export default CowFeed