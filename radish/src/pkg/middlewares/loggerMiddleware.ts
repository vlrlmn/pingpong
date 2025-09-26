import RadishRequest from '../request/RadishRequest';
import RadishResponse from '../response/RadishResponse';

const colorizedStatus = (statusCode: number) => {
    if (statusCode < 200) {
        return `\x1b[47;30m ${statusCode} \x1b[0m`; // White background, black text
    } else if (statusCode < 300) {
        return `\x1b[42;30m ${statusCode} \x1b[0m`; // Green background, black text
    } else if (statusCode < 400) {
        return `\x1b[44;30m ${statusCode} \x1b[0m`; // Blue background, black text
    } else if (statusCode < 500) {
        return `\x1b[43;30m ${statusCode} \x1b[0m`; // Yellow background, black text
    } else if (statusCode < 600) {
        return `\x1b[41;30m ${statusCode} \x1b[0m`; // Red background, black text
    }
    return `${statusCode}`; // Default
}

const loggerMiddleware = async (req: RadishRequest, res: RadishResponse) => {
    console.log(
        `${req.type}\t${colorizedStatus(res.status)} --> ${req.raw}`
    );
};

export default loggerMiddleware;