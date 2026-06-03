export async  function getDistance(lat1, lng1, lat2, lng2){
  const url = `https://router.project-osrm.org/route/v1/foot/${lng1},${lat1};${lng2},${lat2}?overview=false`;
  let distance = null;

  try {
    const response = await fetch(url);
    const data = await response.json(); 
    if (data.code === 'Ok') {
      distance = data.routes[0].distance;
    }
  }catch(err) {
    console.log(`[ERROR here] ${err.message}`);
  }
  console.log(`Distance computed: ${distance}`);
  return distance;
}