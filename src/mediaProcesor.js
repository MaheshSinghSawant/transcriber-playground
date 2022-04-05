let mediaRecorders = [];
let bufferMap = [];
let interval = null;

export async function startMediaProcessors(streams = []) {
    mediaRecorders = streams.map(stream => new MediaRecorder(stream, { mimeType: "audio/webm; codecs=pcm" }));
    bufferMap = Array(mediaRecorders.length).fill([]);

    mediaRecorders.forEach((mr, i) => {
        mr.addEventListener("dataavailable", async (event) => {
            if (bufferMap[i]) {
                const blob = event.data;
                const buffer = await blob.arrayBuffer();
                const typedArray = new Uint8Array(buffer);
                bufferMap[i] = [...bufferMap[i], ...typedArray];
            }
        });

        mr.start(50);
    });

    startBufferingIntervals();

    window.getBuffer = () => {
        const buffersamples = getBufferSamples();
        console.log({ buffersamples });
    };
};

export function getBufferSamples() {
    const buffersLength = bufferMap.map(({ length }) => length - length % 32);
    const minLength = Math.min(...buffersLength);

    return bufferMap
        .map(buffer => buffer.splice(0, minLength))
        .map(buffer => new Int32Array(buffer));
};

export function stoptMediaProcessors() {
    mediaRecorders.forEach((mr, i) => {
        mr.stop();
        bufferMap[i] = null;
    });

    interval.stop();
};

export function startBufferingIntervals() {
    interval = setInterval(() => {
        const bufferSamples = getBufferSamples();
        console.log({ bufferSamples });
    }, 100);
};