const server = require('http').createServer();
const si = require('systeminformation');

const io = require('socket.io')(server, {
    transports: ['websocket', 'polling']
});

// 1. listen for socket connections
io.on('connection', client => {
// 2. Every second, emit a 'red (network)' event to user
    setInterval(function () {
        si.networkStats().then(data => {
            var time = new Date();
            var hour = time.getHours();
            var minute = time.getMinutes();
            var second = time.getSeconds();
            var temp = '' + ((hour > 12) ? hour - 12 : hour);
            if (hour == 0)
                temp = '12';
            temp += ((minute < 10) ? ':0' : ':') + minute;
            temp += ((second < 10) ? ':0' : ':') + second;
            client.emit('red', {
                time: temp,
                value: data[0].rx_sec
            });
            // console.log(data[0].rx_sec + ', ' + temp);
        })
    }, 1000)
});

//server.listen(3000);