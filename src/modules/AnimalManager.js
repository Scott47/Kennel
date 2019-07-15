import APIManager from "./APIManager"


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
    }
})
// export default {
//   get(id) {
//     return fetch(`${remoteURL}/animals/${id}`).then(e => e.json())
//   },
//   getAll() {
//     return fetch(`${remoteURL}/animals`).then(e => e.json())
//   },

// export default {
//   deleteAnimal(id){
//       return fetch(`${remoteURL}/animals/${id}`, {
//           method: "DELETE"}).then(e => e.json())
//   },
//   removeAndList(id) {
//       return this.deleteAnimal(id).then(this.getAll())
//   }
// }
