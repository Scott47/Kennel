import APIManager from "./APIManager"

const remoteURL = "http://localhost:5002"

export default Object.create(APIManager, {
    get: {
        value: function (id) {
        return APIManager.get("animals", id)
        }
    },
    getAll: {
            value: function () {
            return APIManager.all("animals")
        }
    },
    deleteAnimal: {
        value: function (id){
          return fetch(`${remoteURL}/animals/${id}`, {
            method: "DELETE"}).then(e => e.json())}
    },
    post: {
        value: function (newAnimal) {
          return fetch(`${remoteURL}/animals`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify(newAnimal)})
          .then(data => data.json())
        }
    }
  })
