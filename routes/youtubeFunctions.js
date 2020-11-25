const axios = require('axios');

const getVideos = async ( channelID, ) => {
    let videoList = [];
    const numberOfResults = 10
    const url = "https://www.googleapis.com/youtube/v3/search?part=snippet&channelId="
    + channelID + "&maxResults=" + numberOfResults +
    "&order=date&type=video&key=" + "AIzaSyDmy7ugTeaBLPLXe6NxlU3OtDjs3xb7at4"
    const res = await axios.get(url);
    console.log(res)
    res.data.items.forEach(object => {
        console.log(object);
        let videoId = object.id.videoId;
        let videoTitle = object.snippet.title;
        videoList.push({
            id: videoId,
            title: videoTitle,
            thumbnail: object.snippet.thumbnails.medium.url,
            time: object.snippet.publishedAt,
        });
    });
    return videoList;
}

module.exports = {getVideos};
