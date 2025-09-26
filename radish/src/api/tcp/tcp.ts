import { deleteHandler } from "./delete";
import getHandler from "./get";
import { setHandler } from "./set";
import RadishResponse from "../../pkg/response/RadishResponse";
import RadishRequest from "../../pkg/request/RadishRequest";
import loggerMiddleware from "../../pkg/middlewares/loggerMiddleware";

type TCPHandler = (request: RadishRequest) => RadishResponse
export default class TCPRouter {

    static routes: Record<string, TCPHandler> = {
        'GET': getHandler,
        'SET': setHandler,
        'DEL': deleteHandler,
    }


    static handleRequest(data: string): string {
		const input = data.toString().trim();
        try 
        {
            const request:RadishRequest = new RadishRequest(input);
            const currentHandler = this.routes[request.type];
            if (!currentHandler) {
                return RadishResponse.notFound().toJSON();
            }
            const response = currentHandler(request);
    
            loggerMiddleware(request, response);
    
            return response.toJSON();
        } catch (error) {
            console.error("Error parsing request:", error);
            return RadishResponse.badRequest().toJSON();
        }
    }

}