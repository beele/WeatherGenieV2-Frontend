export class ConditionUtils {

    static getConditionSvgName(conditionCode: string): string {
        switch (conditionCode) {
            case 'a':
                return 'sun.svg';
            case 'b':
                return 'cond_partly_clouded.svg';
            case 'c':
                return 'cond_overcast.svg';
            case 'd':
                return 'cond_fog.svg';
            case 'f':
                return 'cond_partly_clouded_rain.svg';
            case 'g':
                return 'cond_thunder.svg';
            case 'h':
                return 'cond_light_rain.svg';
            case 'i':
                return 'cond_snow.svg';
            case 'j':
                return 'cond_partly_clouded.svg';
            case 'k':
                return 'cond_partly_clouded_rain.svg';
            case 'l':
                return 'rain.svg';
            case 'm':
                return 'cond_partly_clouded_rain.svg';
            case 'n':
                return 'cond_fog.svg';
            case 'o':
                return 'cond_partly_clouded.svg';
            case 'p':
                return 'cond_overcast.svg';
            case 'q':
                return 'rain.svg';
            case 'r':
                return 'Mostly cloudy';
            case 's':
                return 'Thunderstorms';
            case 't':
                return 'cond_snow.svg';
            case 'v':
                return 'cond_snow.svg';
            case 'w':
                return 'cond_snow.svg';
        }
    }
}
