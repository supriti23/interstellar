const universesUrl = "http://localhost:1234/universes";
const starsUrl = "http://localhost:1234/stars";

const getData = async (url) => {
  try {
    let response = await fetch(url);
    return response.json();
  } catch(err) {
    return err;
  }
};

export const getUniverses = () => getData(universesUrl);
export const getStars= () => getData(starsUrl);