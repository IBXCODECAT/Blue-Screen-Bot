// req = HTTP incoming message, res = HTTP server response
export default function handler(res: any) {
    res.status(404).json({"code": 404, "type": "Not Found"});
}