import { getAudioSources } from './audio.js';
import { startMediaRecorders, stoptMediaRecorders } from './mediaRecorders.js';

document.addEventListener("readystatechange", function () {
    let audioSources = [];

    document.getElementById("#start").addEventListener("click", async () => {
        try {
            if (audioSources.length === 0) {
                audioSources = await getAudioSources();
            }

            const getStreams = await audioSources.map(async (as) => {
                await as.play();
                return await as.captureStream();
            });

            const streams = await Promise.all(getStreams);

            startMediaRecorders([...streams]);

        } catch (error) {
            console.log({ error });
        }
    });

    document.getElementById("#log").addEventListener("click", () => {
        window.getBuffer && window.getBuffer();
    });

    document.getElementById("#stop").addEventListener("click", async () => {
        try {
            audioSources.map(as => as.pause());
            stoptMediaRecorders();
        } catch (error) {
            console.log({ error });
        }
    });
}, false);