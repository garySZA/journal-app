// En caso de necesitar la implementación del FetchAPI
import 'whatwg-fetch'; // <-- yarn add whatwg-fetch

require('dotenv').config({
    path: '.env.test'
});

jest.mock('./src/config/variables', () => ({
    config: { 
        apiKey: process.env.VITE_API_KEY,
        authDomain: process.env.VITE_AUTH_DOMAIN,
        projectId: process.env.VITE_PROJECT_ID,
        storageBucket: process.env.VITE_STORAGE_BUCKET,
        messagingSenderId: process.env.VITE_MESSAGING_SENDER_ID,
        appId: process.env.VITE_APP_ID,

        cloud_name: process.env.VITE_CLOUD_NAME,
        apiKeyCloud: process.env.VITE_API_KEY_CLOUD,
        apiSecret: process.env.VITE_API_SECRET
    }
}));