// req = HTTP incoming message, res = HTTP server response

//@ts-expect-error
export default function handler(req: any, res: any) {
    return res.status(404).json({"code": 404, "type": "Not Found"});
}