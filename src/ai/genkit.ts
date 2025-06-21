import {genkit} from 'genkit';
import {googleAI} from '@genkit-ai/googleai';

const plugins = [];
if (process.env.GOOGLE_API_KEY) {
  plugins.push(googleAI({apiKey: process.env.GOOGLE_API_KEY}));
} else {
  // This will be logged on the server when the application starts
  console.warn(
    'WARNING: The GOOGLE_API_KEY environment variable is not set. AI features will be disabled.'
  );
}

export const ai = genkit({
  plugins,
  model: 'googleai/gemini-2.0-flash',
});
