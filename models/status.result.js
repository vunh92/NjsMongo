class StatusResult {
    success(){
        var status = {"type": "success", "message": "Success", "code": 200, "error": false,}
        return status
    }

    error(message = 'Error') {
        var status = {"type": "error", "message": message, "code": 404, "error": true,}
        return status
    }
}

module.exports = StatusResult
