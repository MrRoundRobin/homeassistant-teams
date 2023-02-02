import WebSocket from 'ws'
import { connect } from 'mqtt'
import { ServerMessage, ClientMessage, MeetingAction, MeetingService, MeetingActionServiceMap } from './messages'

import config from './config.json'

const ws = new WebSocket('ws://localhost:8124?token=' + config.token)

const mqtt = connect(config.mqtt)

const device = {
    identifiers: process.env.USERNAME,
    name: process.env.USERNAME,
    sw_version: '1.0',
    model: 'Teams HA Link',
    manufacturer: 'Robin Müller'
}

ws.on('open', function open() {
    const topics = [
        'teams/state/isMuted/command',
        'teams/state/isCameraOn/command',
        'teams/state/isHandRaised/command',
        'teams/state/isInMeeting/command',
        'teams/state/isRecordingOn/command',
        'teams/state/isBackgroundBlurred/command',
        'teams/action/leaveCall',
        'teams/action/reactApplause',
        'teams/action/reactLaugh',
        'teams/action/reactLike',
        'teams/action/reactLove',
        'teams/action/reactWow ',
    ]

    mqtt.subscribe(topics)

    mqtt.publish('homeassistant/switch/' + process.env.USERNAME + '/config', JSON.stringify({
        name: 'Mute',
        state_topic: 'teams/state/isMuted',
        command_topic: 'teams/state/isMuted/command',
        availability: {
            payload_available: 'ON',
            payload_not_available: 'OFF',
            topic: 'teams/state/isInMeeting',
        },
        icon: 'mdi:microphone',
        unique_id: 'TeamsMeetingStatusMute' + process.env.USERNAME,
        device: device
    }))

    mqtt.publish('homeassistant/switch/' + process.env.USERNAME + '/camera/config', JSON.stringify({
        name: 'Camera',
        state_topic: 'teams/state/isCameraOn',
        command_topic: 'teams/state/isCameraOn/command',
        availability: {
            payload_available: 'ON',
            payload_not_available: 'OFF',
            topic: 'teams/state/isInMeeting',
        },
        icon: 'mdi:video',
        unique_id: 'TeamsMeetingStatusCamera' + process.env.USERNAME,
        device: device
    }))

    mqtt.publish('homeassistant/switch/' + process.env.USERNAME + '/hand/config', JSON.stringify({
        name: 'Hand',
        state_topic: 'teams/state/isHandRaised',
        command_topic: 'teams/state/isHandRaised/command',
        availability: {
            payload_available: 'ON',
            payload_not_available: 'OFF',
            topic: 'teams/state/isInMeeting',
        },
        icon: 'mdi:hand-front-left',
        unique_id: 'TeamsMeetingStatusHand' + process.env.USERNAME,
        device: device
    }))

    mqtt.publish('homeassistant/binary_sensor/' + process.env.USERNAME + '/in_meeting/config', JSON.stringify({
        name: 'In Meeting',
        state_topic: 'teams/state/isInMeeting',
        unique_id: 'TeamsMeetingStatusInMeeting' + process.env.USERNAME,
        icon: 'mdi:human-male-board',
        device: device
    }))

    mqtt.publish('homeassistant/switch/' + process.env.USERNAME + '/recording/config', JSON.stringify({
        name: 'Recording',
        state_topic: 'teams/state/isRecordingOn',
        command_topic: 'teams/state/isRecordingOn/command',
        availability: {
            payload_available: 'ON',
            payload_not_available: 'OFF',
            topic: 'teams/state/isInMeeting',
        },
        icon: 'mdi:movie-roll',
        unique_id: 'TeamsMeetingStatusRecording' + process.env.USERNAME,
        device: device
    }))

    mqtt.publish('homeassistant/switch/' + process.env.USERNAME + '/blur/config', JSON.stringify({
        name: 'Background Blur',
        state_topic: 'teams/state/isBackgroundBlurred',
        command_topic: 'teams/state/isBackgroundBlurred/command',
        availability: {
            payload_available: 'ON',
            payload_not_available: 'OFF',
            topic: 'teams/state/isInMeeting',
        },
        icon: 'mdi:blur-linear',
        unique_id: 'TeamsMeetingStatusBlur' + process.env.USERNAME,
        device: device
    }))

    mqtt.publish('homeassistant/button/' + process.env.USERNAME + '/leave/config', JSON.stringify({
        name: 'Leave Call',
        command_topic: 'teams/action/leaveCall',
        payload_available: 'ON',
        payload_not_available: 'OFF',
        availability_topic: 'teams/state/isInMeeting',
        icon: 'mdi:run',
        unique_id: 'TeamsMeetingActionLeave' + process.env.USERNAME,
        device: device
    }))

    mqtt.publish('homeassistant/button/' + process.env.USERNAME + '/applause/config', JSON.stringify({
        name: 'Applause',
        command_topic: 'teams/action/reactApplause',
        payload_available: 'ON',
        payload_not_available: 'OFF',
        availability_topic: 'teams/state/isInMeeting',
        icon: 'mdi:hand-clap',
        unique_id: 'TeamsMeetingActionApplause' + process.env.USERNAME,
        device: device
    }))

    mqtt.publish('homeassistant/button/' + process.env.USERNAME + '/laugh/config', JSON.stringify({
        name: 'Laugh',
        command_topic: 'teams/action/reactLaugh',
        payload_available: 'ON',
        payload_not_available: 'OFF',
        availability_topic: 'teams/state/isInMeeting',
        icon: 'mdi:emoticon-excited-outline',
        unique_id: 'TeamsMeetingActionLaugh' + process.env.USERNAME,
        device: device
    }))

    mqtt.publish('homeassistant/button/' + process.env.USERNAME + '/like/config', JSON.stringify({
        name: 'Like',
        command_topic: 'teams/action/reactLike',
        payload_available: 'ON',
        payload_not_available: 'OFF',
        availability_topic: 'teams/state/isInMeeting',
        icon: 'mdi:thumb-up-outline',
        unique_id: 'TeamsMeetingActionLike' + process.env.USERNAME,
        device: device
    }))

    mqtt.publish('homeassistant/button/' + process.env.USERNAME + '/love/config', JSON.stringify({
        name: 'Love',
        command_topic: 'teams/action/reactLove',
        payload_available: 'ON',
        payload_not_available: 'OFF',
        availability_topic: 'teams/state/isInMeeting',
        icon: 'mdi:heart-outline',
        unique_id: 'TeamsMeetingActionLove' + process.env.USERNAME,
        device: device
    }))

    mqtt.publish('homeassistant/button/' + process.env.USERNAME + '/wow/config', JSON.stringify({
        name: 'Wow',
        command_topic: 'teams/action/reactWow',
        payload_available: 'ON',
        payload_not_available: 'OFF',
        availability_topic: 'teams/state/isInMeeting',
        icon: 'mdi:emoticon-dead-outline',
        unique_id: 'TeamsMeetingActionWow' + process.env.USERNAME,
        device: device
    }))

    const requestUpdateMessage: ClientMessage = {
        apiVersion: '1.0.0',
        action: MeetingAction.QueryMeetingState,
        service: MeetingService.QueryMeetingState,
        timestamp: new Date().valueOf(),
        manufacturer: 'Elgato',
        device: 'Stream Deck'
    }

    ws.send(JSON.stringify(requestUpdateMessage))
})

mqtt.on('message', function (topic, message) {

    if (!topic.startsWith('teams/'))
        return

    let action:  MeetingAction  | undefined

    let state = message.toString().toLowerCase() === 'true' || message.toString().toLowerCase() === 'on' || message.toString().toLowerCase() === 'press' || !!+message

    switch (topic.split('/')[2]) {
        case 'isMuted':
            action  = state ? MeetingAction.Mute : MeetingAction.Unmute
            break
        case 'isCameraOn':
            action  = state ? MeetingAction.ShowVideo : MeetingAction.HideVideo
            break
        case 'isHandRaised':
            action  = state ? MeetingAction.RaiseHand : MeetingAction.LowerHand
            break
        case 'isRecordingOn':
            action  = state ? MeetingAction.StartRecording : MeetingAction.StopRecording
            break
        case 'isBackgroundBlurred':
            action  = state ? MeetingAction.BlurBackground : MeetingAction.UnblurBackground
            break
        case 'leaveCall':
            if (state)
                action  = MeetingAction.LeaveCall
            break
        case 'reactApplause':
            if (state)
                action  = MeetingAction.ReactApplause
            break
        case 'reactLaugh':
            if (state)
                action  = MeetingAction.ReactLaugh
            break
        case 'reactLike':
            if (state)
                action  = MeetingAction.ReactLike
            break
        case 'reactLove':
            if (state)
                action  = MeetingAction.ReactLove
            break
        case 'reactWow':
            if (state)
                action  = MeetingAction.ReactWow
            break
    }

    if (action === undefined)
        return

    const sendMessage: ClientMessage = {
        apiVersion: '1.0.0',
        service: MeetingActionServiceMap.get(action)!,
        action: action,
        timestamp: new Date().valueOf(),
        manufacturer: 'Elgato',
        device: 'Stream Deck'
    }

    ws.send(JSON.stringify(sendMessage))
})

ws.on('message', function message(data) {

    const message: ServerMessage = JSON.parse(data.toString())

    mqtt.publish('teams/state/isMuted',              message.meetingUpdate.meetingState.isMuted              ? 'ON' : 'OFF', { retain: true })
    mqtt.publish('teams/state/isCameraOn',           message.meetingUpdate.meetingState.isCameraOn           ? 'ON' : 'OFF', { retain: true })
    mqtt.publish('teams/state/isHandRaised',         message.meetingUpdate.meetingState.isHandRaised         ? 'ON' : 'OFF', { retain: true })
    mqtt.publish('teams/state/isInMeeting',          message.meetingUpdate.meetingState.isInMeeting          ? 'ON' : 'OFF', { retain: true })
    mqtt.publish('teams/state/isRecordingOn',        message.meetingUpdate.meetingState.isRecordingOn        ? 'ON' : 'OFF', { retain: true })
    mqtt.publish('teams/state/isBackgroundBlurred',  message.meetingUpdate.meetingState.isBackgroundBlurred  ? 'ON' : 'OFF', { retain: true })

    mqtt.publish('teams/permission/canToggleMute',   message.meetingUpdate.meetingPermissions.canToggleMute   ? 'ON' : 'OFF', { retain: true })
    mqtt.publish('teams/permission/canToggleVideo',  message.meetingUpdate.meetingPermissions.canToggleVideo  ? 'ON' : 'OFF', { retain: true })
    mqtt.publish('teams/permission/canToggleHand',   message.meetingUpdate.meetingPermissions.canToggleHand   ? 'ON' : 'OFF', { retain: true })
    mqtt.publish('teams/permission/canToggleBlur',   message.meetingUpdate.meetingPermissions.canToggleBlur   ? 'ON' : 'OFF', { retain: true })
    mqtt.publish('teams/permission/canToggleRecord', message.meetingUpdate.meetingPermissions.canToggleRecord ? 'ON' : 'OFF', { retain: true })
    mqtt.publish('teams/permission/canLeave',        message.meetingUpdate.meetingPermissions.canLeave        ? 'ON' : 'OFF', { retain: true })
    mqtt.publish('teams/permission/canReact',        message.meetingUpdate.meetingPermissions.canReact        ? 'ON' : 'OFF', { retain: true })
});
