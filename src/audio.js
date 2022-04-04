const fetchAudioFile = (fileName) =>
    fetch(fileName)
        .then(res => res.blob())
        .then(blob => new Audio(URL.createObjectURL(blob)));

export const getAudioSources = async () =>
    await Promise.all([1, 2, 3].map(i => fetchAudioFile(`audio/${i}.wav`)));