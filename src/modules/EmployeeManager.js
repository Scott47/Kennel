import APIManager from "./APIManager"





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