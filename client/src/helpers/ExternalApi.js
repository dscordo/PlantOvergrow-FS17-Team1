class ExternalApi {
  static async showDetails(pid) {
    //console.log("showDetails", pid);
    let response = await fetch(`/externalApi/getPlantDetail/${pid}`);
    if (response.ok) {
      let result = await response.json();
      return result;
    } else {
      return null;
    }
  }
}

export default ExternalApi;
