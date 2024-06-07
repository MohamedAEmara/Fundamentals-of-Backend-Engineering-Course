const offer = "SOME VALUE";
// NOTE: "SOME VALUE" is what we get from the client A 
// It's the SDP created that A will send to B via whatever to able to connect to.

// Create a remote peerConnection. 
const rc = new RTCPeerConnection();

// Every time we get a new ICE candidate, rePrint the SDP
rc.onicecandidate = e => console.log("New ICE Candidiate! reprenting SDP" + JSON.stringify(rc.localDescription));


// We're not gonna create a new "DataChannel". instead, we'll receieve it from the other party.
// Because this isn't the initiator, it's just a receiver.
rc.ondatachannel = e => {
    // We'll create a new variable (dc) datachannel to save the DC we just received.
    // "e.channel"  contains the data channel we just received. 
    rc.dc = e.channel; 

    rc.dc.onmessage = e => console.log("new message from client! " + e.data);
    rc.dc.onopen = e => console.log("Connection OPENED!!");
}   


// After that, we want to send the remote description with the (offer)
rc.setRemoteDescription(offer).then(a => console.log("offer set!"));


// Set the localDescription of the remote-server
rc.createAnswer().then(a => rc.setLocalDescription(a)).then(a => console.log("answer created!"));
// that will trickle the ICE candidate.

// Now we got the (answer)


// ---------------------------------------------------------------------------


// Afther the other client takes this answer, they will be connected and can communicate.
// Now, we can send to A like this:

rc.dc.send("fine what about you, A");


// NOTE: this is the simplest way to communicate (messages)
// You can send a video via (addTrack)
// lc.rc.addTrack() 
// This will create a stream from your camera & mic and send to the other party.




// ===================== Set custom TURN & STUN Servers ===================== //
const iceConfiguration = {
    iceServers: [{
            urls: 'turn:turnserver.company.com:3478',
            username: 'optional-username',
            credentials: 'auth-token'
        },
        {
            urls: 'stun:stun.services.mozilla.com',
            username: 'test@mozilla.com',
            credential: 'webrtcdemo'
        }
    ]
}


const pc = new RTCPeerConnection(iceConfiguration);