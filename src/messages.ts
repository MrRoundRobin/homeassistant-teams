export interface ServerMessage {
    apiVersion: '1.0.0',
    meetingUpdate: {
        meetingState: {
            isMuted: boolean,
            isCameraOn: boolean,
            isHandRaised: boolean,
            isInMeeting: boolean,
            isRecordingOn: boolean,
            isBackgroundBlurred: boolean
        },
        meetingPermissions: {
            canToggleMute: boolean,
            canToggleVideo: boolean,
            canToggleHand: boolean,
            canToggleBlur: boolean,
            canToggleRecord: boolean,
            canLeave: boolean,
            canReact: boolean
        },
    },
}

export interface ClientMessage {
    apiVersion: string,
    action: MeetingAction,
    service: MeetingService,
    timestamp: number,
    manufacturer: string,
    device: string,
}

export enum MeetingAction {
    QueryMeetingState = 'query-meeting-state',

    Mute       = 'mute',
    Unmute     = 'unmute',
    ToggleMute = 'toggle-mute',

    ShowVideo   = 'show-video',
    HideVideo   = 'hide-video',
    ToggleVideo = 'toggle-video',

    BlurBackground       = 'blur-background',
    UnblurBackground     = 'unblur-background',
    ToggleBlurBackground = 'toggle-blur-background',

    RaiseHand  = 'raise-hand',
    LowerHand  = 'lower-hand',
    ToggleHand = 'toggle-hand',

    StartRecording  = 'start-recording',
    StopRecording   = 'stop-recording',
    ToggleRecording = 'toggle-recording',

    LeaveCall     = 'leave-call',
    ReactApplause = 'react-applause',
    ReactLaugh    = 'react-laugh',
    ReactLike     = 'react-like',
    ReactLove     = 'react-love',
    ReactWow      = 'react-wow',
}

export enum MeetingService {
    QueryMeetingState = 'query-meeting-state',
    ToggleMute = 'toggle-mute',
    ToggleVideo = 'toggle-video',
    BackgroundBlur = 'background-blur',
    RaiseHand = 'raise-hand',
    Recording = 'recording',
    Call = 'call',
}

export const MeetingActionServiceMap: Map<MeetingAction,MeetingService> = new Map([
    [MeetingAction.QueryMeetingState, MeetingService.QueryMeetingState],
    [MeetingAction.Mute, MeetingService.ToggleMute],
    [MeetingAction.Unmute, MeetingService.ToggleMute],
    [MeetingAction.ToggleMute, MeetingService.ToggleMute],
    [MeetingAction.ShowVideo, MeetingService.ToggleVideo],
    [MeetingAction.HideVideo, MeetingService.ToggleVideo],
    [MeetingAction.ToggleVideo, MeetingService.ToggleVideo],
    [MeetingAction.BlurBackground, MeetingService.BackgroundBlur],
    [MeetingAction.UnblurBackground, MeetingService.BackgroundBlur],
    [MeetingAction.ToggleBlurBackground, MeetingService.BackgroundBlur],
    [MeetingAction.RaiseHand, MeetingService.RaiseHand],
    [MeetingAction.LowerHand, MeetingService.RaiseHand],
    [MeetingAction.ToggleHand, MeetingService.RaiseHand],
    [MeetingAction.StartRecording, MeetingService.Recording],
    [MeetingAction.StopRecording, MeetingService.Recording],
    [MeetingAction.ToggleRecording, MeetingService.Recording],
    [MeetingAction.LeaveCall, MeetingService.Call],
    [MeetingAction.ReactApplause, MeetingService.Call],
    [MeetingAction.ReactLaugh, MeetingService.Call],
    [MeetingAction.ReactLike, MeetingService.Call],
    [MeetingAction.ReactLove, MeetingService.Call],
    [MeetingAction.ReactWow, MeetingService.Call],
])
