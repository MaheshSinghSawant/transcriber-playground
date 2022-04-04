let mediaRecorders = [];
let bufferMap = [];
let interval = null;

export const startMediaProcessors = async (streams = []) => {
    mediaRecorders = streams.map(stream => new MediaRecorder(stream));
    bufferMap = Array(mediaRecorders.length).fill([]);

    mediaRecorders.forEach((mr, i) => {
        mr.addEventListener("dataavailable", event => {
            if (bufferMap[i]) {
                const blob = event.data;
                bufferMap[i].push(blob);
            }
        });

        mr.start(50);
    });

    window.getBuffer = () => console.log(bufferMap);
};

export const stoptMediaProcessors = () => {
    mediaRecorders.forEach((mr, i) => {
        mr.stop();
        bufferMap[i] = null;
    });
};

export const startBufferingIntervals = (mediaRecorders = []) => {
    interval = setInterval(() => {
        //
    }, 100);
};