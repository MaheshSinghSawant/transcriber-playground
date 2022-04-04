import { getAudioSources } from './audio.js';
import { stoptMediaProcessors, startMediaProcessors } from './mediaprocesor.js';

document.addEventListener("readystatechange", function () {
    document.getElementById("#start").addEventListener("click", async () => {
        try {
            const audioSources = await getAudioSources();

            const streams = audioSources.map(async (as) => {
                await as.play();
                return as.captureStream();
            });

            startMediaProcessors([...streams]);

        } catch (error) {
            console.log({ error });
        }
    });

    document.getElementById("#stop").addEventListener("click", async () => {
        try {
            stoptMediaProcessors();
        } catch (error) {
            console.log({ error });
        }
    });
}, false);