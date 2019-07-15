import APIManager from "./APIManager"

const remoteURL = "http://localhost:5002"



export default Object.create(APIManager, {
    get: {
        value: function (id) {
        return APIManager.get("employees", id)
        }
    },
    getAll: {
            value: function () {
            return APIManager.all("employees")
        }
    }
})