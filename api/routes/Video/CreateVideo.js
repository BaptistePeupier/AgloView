const Users = require("../../Outils/Schema/User")
const Playlists = require("../../Outils/Schema/Playlists")
const Videos = require("../../Outils/Schema/Videos")
const {isUser, getUserID} = require("../../Outils/auth");
const axios = require("axios")
const {sendMessage, sendError} = require("../../Outils/helper");

async function CreateVideo(req, res) {
  if (isUser(req, res)) {
    if (
      (typeof req.body.youtube_video_id !== "undefined") && (req.body.youtube_video_id !== null) &&
      (typeof req.body.id_playlist !== "undefined") && (req.body.id_playlist !== null)
    ){
      const apiKey = "AIzaSyBMoIqcF8lAihMcHub2_B8RiifMVyc-Mvs"
      const baseYTApiUrl = "https://www.googleapis.com/youtube/v3"
      const searchQuery = req.body.youtube_video_id;

      const video = await axios.get(`${baseYTApiUrl}/videos?part=snippet&id=${searchQuery}&key=${apiKey}`);
      if (video.data.pageInfo.totalResults > 0) {
        const video_tags = video.data.items[0].snippet.tags;
        const video_category_id = video.data.items[0].snippet.categoryId;

        let category;
        if (video_category_id !== null) {
          const videoCategory = await axios.get(`${baseYTApiUrl}/videoCategories?part=snippet&id=${video_category_id}&key=${apiKey}`);
          category = videoCategory.data.items[0].snippet.title;
        }

        // Save Video in DB & check Playlist exist
        const playlist = await Playlists.findOne({_id: req.body.id_playlist});
        if (playlist !== null) {

          // Save video in DB
          const newVideo = new Videos({
            link: req.body.youtube_video_id,
            title: video.data.items[0].snippet.title
          });
          await newVideo.save((err, resp) => {
            if(err) return sendError(res, err);

            // Link with Playlist
            playlist.videos.push(resp._id);
            Playlists.updateOne({_id: req.body.id_playlist}, {videos: playlist.videos}, (err, resp) => {
              if(err) return sendError(res, err);
            })
          })

          // update User's tags
          const currentUser = await Users.findOne({_id: getUserID(req)});
          if (currentUser !== null){
            let wordsTags;

            if (typeof video_tags !== 'undefined') {
              for (let i = 0 ; i < video_tags.length ; i++) {
                wordsTags = video_tags[i].split(/(?<=^\S+)\s/);
                wordsTags = wordsTags.map(tag => tag.toLowerCase());  // Lowercase tag to facilitate search with annonce's tag.

                for (let j = 0 ; j < wordsTags.length ; j++) {
                  // check if tag exists: if already in user's lists, update occurrences of it.
                  const tagExists = currentUser.tags.find(element => {
                    if ((typeof element.tag !== 'undefined') && (element.tag.includes(wordsTags[j]))) {
                      element.occurrence ++;
                      return true;
                    }
                  });

                  // if it doesn't exist, add it with 1 occurrence.
                  if (tagExists === undefined) {
                    currentUser.tags.push({tag: wordsTags[j], occurrence: 1});
                  }
                }
              }

              // save Users' tags
              Users.updateOne({_id: getUserID(req)}, {tags: currentUser.tags}, (err, resp) => {
                if(err) return sendError(res, err);
              });
            }

            sendMessage(res, {
              video_id: newVideo._id,
              youtube_video_id: searchQuery,
              title: video.data.items[0].snippet.title,
              tags: video_tags,
              category: category
            });
          }
          else {
            sendError(res, "User doesn't exists");
          }
        }
        else {
          sendError(res, "Playlist doesn't exist");
        }
      }
      else {
        sendError(res, "Video not found");
      }
    }
    else {
      sendError(res, "Missing Required Fields");
    }
  }
}
module.exports = CreateVideo;
