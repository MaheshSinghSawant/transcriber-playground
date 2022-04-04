let mediaRecorders = [];
let bufferMap = [];

export const startMediaProcessors = async (streams = []) => {
    mediaRecorders = streams.map(stream => new MediaRecorder(stream));
    bufferMap = Array(mediaRecorders.length).fill([]);

    mediaRecorders.forEach((mr, i) => {
        mr.addEventListener("dataavailable", event => {
            const blob = event.data;

            bufferMap[i].append(blob);
        });

        mr.start();
    });

    window.getBuffer = () => console.log(bufferMap);
};

export const stoptMediaProcessors = () => {
    mediaRecorders.forEach((mr, i) => {
        mr.stop();
        bufferMap(i) = null;
    });
};