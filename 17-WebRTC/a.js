// First of all in client A console:
// we create a local PeerConnection     
const lc = new RTCPeerConnection();


// After that we'll create a data channel, The channel we gonna communicate through
const dc = lc.createDataChannel('channel');

// Now we have some meta-data like:

// When we reeive a message => print the message.
dc.onmessage = e => console.log("We just got a message " + e.data);


dc.onopen = e => console.log("Connection opened!");


// Every time I get an ICE candidate, I want to rePrint the description protocol.
lc.onicecandidate = e => console.log("New ICE Candidiate! reprenting SDP" + JSON.stringify(lc.localDescription));


// The next thing we're gonna do is "Create an Offer"...
// What we're gonna do with the offer => set it in localDescription.
lc.createOffer().then(o => lc.setLocalDescription(o)).then(a => console.log("Set successfully!"));

// After setting the iceCandidate, we can copy it and send it to the other part (client B)
// to use and be able to comminicate with this client.


// -----------------------------------------------------------------






const answer = "THE VALUE WE GOT AFTER CREATING ANSWER IN b.js"
lc.setRemoteDescription(answer);
// Connection Opened.



// Now, we can send data between them.
dc.send("you beer B. What's up");