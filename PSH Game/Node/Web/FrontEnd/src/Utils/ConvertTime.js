export const convertTime = (time) => {
    let convertedTime = new Date(time * 1000).toISOString().split('T');
    let convertedTimeStr = (convertedTime[0] + ' ' + convertedTime[1]);
    let parsedTime = convertedTimeStr.slice(0, 19);
    return parsedTime;
}