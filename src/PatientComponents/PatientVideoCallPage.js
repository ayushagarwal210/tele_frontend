import React from 'react'
import { ZegoUIKitPrebuilt } from '@zegocloud/zego-uikit-prebuilt'
// import { ZegoUser } from '@zegocloud/zego-uikit-prebuilt';
import { useUrl } from '../providers/Provider';
import { useNavigate } from 'react-router-dom';
import './PatientStyle.css'


const RoomPage = () => {

  const navigate = useNavigate()
  const goBack = () => {
    navigate('/patient')
  }


  const roomId = "123"

  // const newZegoUser = new ZegoUser();
  // newZegoUser.userName = 'Akanksha';
  // newZegoUser.userID = '789';

  const userState = useUrl()
  console.log(userState)
  userState.setUrl(window.location.protocol + '//' +
    window.location.host + window.location.pathname +
    '?roomID=' +
    roomId)

  console.log(userState)


  const myMeeting = async (element) => {
    //   const appID = 1613973613;             ***one-on-one call
    //   const serverSecret = "f06a963274343ee0a50c0ed8377bcd10";
    const appID = 524151284;       //tele-health
    const serverSecret = "430713bb560808706b4918807d0af4a9";
    const kitToken = ZegoUIKitPrebuilt.generateKitTokenForTest(
      appID,
      serverSecret,
      roomId,
      Date.now().toString(),
      'Akanksha'
    )

    const zp = ZegoUIKitPrebuilt.create(kitToken)

    zp.joinRoom({
      container: element,
      scenario: {
        mode: ZegoUIKitPrebuilt.OneONoneCall
      },
      sharedLinks: [
        {
          name: 'Personal link',
          url:
            window.location.protocol + '//' +
            window.location.host + window.location.pathname +
            '?roomID=' +
            roomId,
        },
      ],
      showPreJoinView: true,
      showScreenSharingButton: false,
      maxUsers: 2,
      showUserList: false,
      layout: "Auto",
      showLayoutButton: true,
      showRoomDetailsButton: false,
      turnOnCameraWhenJoining: false,
      turnOnMicrophoneWhenJoining: false,
      whiteboardConfig: {
        showAddImageButton: true // It's set to false by default. To use this feature, activate the File Sharing feature, and then import the plugin. Otherwise, this prompt will occur: "Failed to add image, this feature is not supported."
        // showCreateAndCloseButton?: boolean; // Whether to display the button that is used to create/turn off the whiteboard. Displayed by default.
      },
      // onLeaveRoom: (newZegoUser) => navigate(`/patient`) // This will be triggered when you left the room.
    })

    // zp.setCallInvitationConfig({
    //   enableCustomCallInvitationWaitingPage: true,
    //   // The following is the callback for showing the waiting page after a call invitation is sent. To cancel the call invitation, set it to [cancel].
    //   onWaitingPageWhenSending: (callType, callees, cancel) => {
    //     // Add your custom logic here. 
    //     // The following shows an example, the waitingPageDom is the DOM object that is used to represent the page element, here the page indicates the waiting page when sending a call invitation.
    //     waitingPageDom.style.display = 'block';
    //     // The method used to set the cancel call invitation operation.
    //     cancelButton.onclick = () => {
    //       cancel();
    //     }
    //   },
    //   onSetRoomConfigBeforeJoining: (callType) => {
    //     // The callback for set room config before joining the room, at which point you can hide the waiting page before joining the room.
    //     waitingPageDom.style.display = 'none';
    //   },
    //   onCallInvitationEnded: (reason) => {
    //     // You will need to hide your custom waiting page when your call invitation is not connected successfully.
    //     waitingPageDom.style.display = 'none';
    //   }

    // })



  }

  return (
    <div className='room-page'>
      <div  ref={myMeeting} style={{ width: "80vw", height: "80vh" }} />
      <div>
        <button type='secondary' onClick={goBack}>Go To Dashboard</button>
      </div>
    </div>
  )
}

export default RoomPage
