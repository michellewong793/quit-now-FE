
// Send Notification to Visitors using Push Protocol when they arrive on the Dapp 
//   const sendWelcomeNotification = await PushAPI.payloads.sendNotification({
//     signer,
//     type: 3, // target
//     identityType: 2, // direct payload
//     notification: {
//       title: `Welcome!`,
//       body: `Thanks for helping me quit my toxic job!`
//     },
//     payload: {
//       title: `[sdk-test] payload title`,
//       body: `sample msg body`,
//       cta: '',
//       img: ''
//     },
//     recipients: 'eip155:5:0xf536E988c04565C5309Efb02bc0ff7757e9C2512', // recipient address
//     channel: 'eip155:5:0xf536E988c04565C5309Efb02bc0ff7757e9C2512', // your channel address
//     env: 'staging'
//   });

//   //Send out daily Thank you to all the subscribers
//   const dailyMessageNotification = await PushAPI.payloads.sendNotification({
//     signer,
//     type: 4, // subset
//     identityType: 2, // direct payload
//     notification: {
//       title: `GM! Thank you for being a part of my people`,
//       body: `You are the best`
//     },
//     payload: {
//       title: `[sdk-test] payload title`,
//       body: `sample msg body`,
//       cta: '',
//       img: ''
//     },
//     recipients: ['eip155:5:0xD8634C39BBFd4033c0d3289C4515275102423681', 'eip155:5:0xCdBE6D076e05c5875D90fa35cc85694E1EAFBBd1'], // recipients addresses
//     channel: 'eip155:5:0xD8634C39BBFd4033c0d3289C4515275102423681', // your channel address
//     env: 'staging'
//   });
