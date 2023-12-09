import React, { useState } from 'react'
import { VscSymbolKeyword } from 'react-icons/vsc';
import { Modal } from '../../Component/Modal/Modal';
import { GlobalStyle } from '../../globalStyles';

function JobList(jobList) {
    const [showModal, setShowModal] = useState(false);
    const openModal = () => {
        setShowModal(prev => !prev);
    };
    return (
        <div className="careers__section">
            <div className='careers__listing'>
                <div className="careers__section__heading">
                    <div className="section__heading">OPEN POSITIONS</div>
                    <div className="divider" />
                </div>
            </div>
            <div className='job__posts'>
                <div className='job__post'>
                    <VscSymbolKeyword size='30px' />
                    <div className="job__designation">DESIGNATION</div>
                    <div className='job__responsibility'>Job Responsibility</div>
                    <div className='job__desc'>Lorem ipsum dolor sit amet,
                        consectetur adipiscing elit. Suspendisse justo o
                        dio, pellentesque et faucibus id, mollis id lacus.
                        Integer efficitur veli</div>
                    <div className='apply' onClick={openModal}>APPLY NOW</div>
                    <div class="go-corner" href="#">
                        <div class="go-arrow">
                            →
                        </div>
                    </div>
                </div>
            </div>
            <Modal showModal={showModal} setShowModal={setShowModal} />
            <GlobalStyle />
        </div>
        
    )
}

export default JobList