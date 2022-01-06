const User = require("../../Outils/Schema/User")
const Annonces = require("../../Outils/Schema/Annonces")
const {isUser, getUserID} = require("../../Outils/auth");
const {sendError, sendMessage} = require("../../Outils/helper");

async function GetAnnonceForUser(req, res) {
  if (isUser(req, res)){
    const currentUser = await User.findOne({_id: getUserID(req)});

    if (currentUser !== null) {
      currentUser.tags.sort(function (tag1, tag2) {
        return tag2.occurrence - tag1.occurrence;
      });

      const userTop10Tags = currentUser.tags.slice(0, 10);
      for (let i = 0; i < userTop10Tags.length; i++) {
        userTop10Tags[i] = userTop10Tags[i].tag;
      }

      const correspondingAnnonces = await Annonces.find({tags: {$in:userTop10Tags}});

      let bestCorrespondingAnnonces;
      if (correspondingAnnonces.length !== 0) {
        // Determine the annonce that correspond the best to the current user.
        correspondingAnnonces.sort(function (annonce1, annonce2) {
          return annonce2.tags.filter(tag => userTop10Tags.includes(tag)).length
            - annonce1.tags.filter(tag => userTop10Tags.includes(tag)).length
        });
        bestCorrespondingAnnonces = correspondingAnnonces[0];
      }
      else {
        // If no annonce correspond to the current user, get one randomly.
        const nbAnnonces = await Annonces.count();
        let random = Math.floor(Math.random() * nbAnnonces)

        // Query all Annonces but only fetch one offset by our random
        bestCorrespondingAnnonces = await Annonces.findOne().skip(random);

        if (bestCorrespondingAnnonces === null) return sendError(res, "No annonces available");
      }
      // Update the number of time the Annonce has been viewed
      bestCorrespondingAnnonces.nb_vues++;
      Annonces.updateOne({_id: bestCorrespondingAnnonces._id}, bestCorrespondingAnnonces, (err, resp) => {
        if (err) return sendError(res, err);
        return sendMessage(res, bestCorrespondingAnnonces);
      });
    }
    else {
      sendError(res, "User currently logged doesn't exists");
    }
  }
}
module.exports = GetAnnonceForUser;
