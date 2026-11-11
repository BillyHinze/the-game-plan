import {Config} from '@remotion/cli/config';
Config.setVideoImageFormat('jpeg');
Config.setPixelFormat('yuv420p');
Config.setConcurrency(1);
Config.setChromiumOpenGlRenderer('swangle');
