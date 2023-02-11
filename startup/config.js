import config from 'config'

export default function startupConfig(){
    if (!config.get('jwtPrivateKey')) {
        console.error('FATAL ERROR: jwtPrivateKey is not defined');
        process.exit(1);
    }
}