async function main() {
    const fs = require('fs');
    const speech = require('@google-cloud/speech');

    const projectId = 'smart-education-1571465228387'
    const keyFilename = 'smart-education.json'

    // Creates a client
    const client = new speech.SpeechClient({projectId, keyFilename});

    /**
     * TODO(developer): Uncomment the following lines before running the sample.
     */
    const filename = 'file_example.wav';
    // const encoding = 'LINEAR16';
    const sampleRateHertz = 8000;
    const languageCode = 'en-US';

    const config = {
        // encoding: encoding,
        sampleRateHertz: sampleRateHertz,
        languageCode: languageCode,
    };
    const audio = {
        content: fs.readFileSync(filename).toString('base64'),
    };

    const request = {
        config: config,
        audio: audio,
    };

    // Detects speech in the audio file
    const [response] = await client.recognize(request);
    const transcription = response.results
        .map(result => result.alternatives[0].transcript)
        .join('\n');
    console.log(`Transcription: `, transcription);
}
main().catch(console.error)