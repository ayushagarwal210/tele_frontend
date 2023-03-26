import React from 'react'
import { useParams } from 'react-router-dom'
import { ZegoUIKitPrebuilt } from '@zegocloud/zego-uikit-prebuilt'

const VideoCallPage = () => {
    const { roomId } = useParams()

    const myMeeting = async (element) => {
        const appID = 1613973613;                // ***one-on-one call
        const serverSecret = "f06a963274343ee0a50c0ed8377bcd10";
        // const appID = 524151284;
        // const serverSecret = "430713bb560808706b4918807d0af4a9";
        const kitToken = ZegoUIKitPrebuilt.generateKitTokenForTest(
            appID,
            serverSecret,
            roomId,
            Date.now().toString(),
            "Akanksha"
        )

        const zp = ZegoUIKitPrebuilt.create(kitToken)
        zp.joinRoom({
            container: element,
            scenario: {
                mode: ZegoUIKitPrebuilt.OneONoneCall
            },
            showPreJoinView: false,
            showScreenSharingButton: false,
            maxUsers: 2,
            showUserList: false,
            layout: "Auto",
            showLayoutButton: true,
            showRoomDetailsButton: true,
        })
    }
    return (
        <div className='room-page'>
            <div ref={myMeeting} style={{ width: "50vw", height: "50vh" }} />
        </div>
    )
}

export default VideoCallPage
