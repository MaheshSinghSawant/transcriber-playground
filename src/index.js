import { getAudioSources } from './audio.js';
import { stoptMediaProcessors, startMediaProcessors } from './mediaprocesor.js';

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

            startMediaProcessors([...streams]);

        } catch (error) {
            console.log({ error });
        }
    });

    document.getElementById("#stop").addEventListener("click", async () => {
        try {
            audioSources.map(as => as.pause());
            stoptMediaProcessors();
        } catch (error) {
            console.log({ error });
        }
    });
}, false);