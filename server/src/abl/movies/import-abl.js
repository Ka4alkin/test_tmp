const BinaryHelper = require('../../helpers/binary-helper');
const AppHelper = require('../../helpers/app-helper');
const multer = require('multer');
const storage = multer.memoryStorage();
const upload = multer({storage: storage});
const cfg = require('../../app-config');
const sequelize = require('../../database');
const Movie = require('../../models/movies-model');
const Actor = require('../../models/actor-model');

const messages = {
  error: {
    fileUploadFailed: 'fileUploadFailed',
    noFileUploaded: 'noFileUploaded',
    wrongFormat: 'wrongFormat',
    wrongActorDtoIn: 'wrongActorDtoIn',
    creatingActorFailed: 'creatingActorFailed',
    actorTitleShouldBeUnique: 'actorTitleShouldBeUnique',
    transactionErrRollback: 'transactionErrRollback, check is it not the same date in file, items should be unique',
  },
  success: {
  },
};

class ImportMovieAbl {
  async importMovie(req, res) {
    upload.single('file')(req, res, async function(err) {
      if (err) {
        return AppHelper.throwError(res, messages.error.fileUploadFailed, err);
      }

      if (req?.file?.mimetype !== 'text/plain') {
        return AppHelper.throwError(res, messages.error.wrongFormat);
      }

      if (!req.file) {
        return AppHelper.throwError(res, messages.error.noFileUploaded, err);
      }

      const fileContent = req.file.buffer.toString('utf-8');
      const moviesArray = BinaryHelper.parseMovies(fileContent);

      const allowedKeysMap = {};

      cfg.MOVIE_ALLOWED_FILE_KEY_LIST.forEach((key) => {
        allowedKeysMap[key] = true;
      });

      const notUploadedIndexList = [];
      const uploadedIndexList = [];

      const actorObjectInitialsCashList = [];
      const transaction = await sequelize.transaction();

      try {
        for (let movieIndex = 0; movieIndex < moviesArray.length; movieIndex++) {
          const movieObjectItem = moviesArray[movieIndex];

          const isMovieExist= !!await Movie.findOne({where: [{title: movieObjectItem.Title}]});

          const movieObjectItemKeys = Object.keys(movieObjectItem);

          const isKeysMatched = movieObjectItemKeys.every((key) => allowedKeysMap.hasOwnProperty(key));

          if (!isKeysMatched || isMovieExist) {
            notUploadedIndexList.push({movieIndex, title: movieObjectItem.Title, alreadyExist: true});
            continue;
          } else {
            uploadedIndexList.push({movieIndex, title: movieObjectItem.Title});
          }

          const actorObjectList = [];

          if (movieObjectItem.Stars) {
            const actorsArray = movieObjectItem.Stars.split(', ');

            for (let actorIndex = 0; actorIndex < actorsArray.length; actorIndex++) {
              const actorObjectItem = actorsArray[actorIndex];
              const [firstName, lastName] = actorObjectItem.split(' ');

              if (!firstName || !lastName) AppHelper.throwError(res, messages.error.wrongActorDtoIn);

              const actorDtoIn = {name: firstName, surname: lastName};
              const existingActorInitials = actorObjectInitialsCashList.find(
                  (actorInitials) =>
                    actorInitials.name === actorDtoIn.name && actorInitials.surname === actorDtoIn.surname,
              );

              if (!existingActorInitials) {
                const existingActor = await Actor.findOne({where: actorDtoIn});

                if (!existingActor) {
                  let newActorObject;
                  try {
                    newActorObject = await Actor.create(actorDtoIn, {transaction});
                  } catch (e) {
                    return AppHelper.throwError(res, messages.error.creatingActorFailed);
                  }
                  actorObjectList.push(newActorObject);
                  actorObjectInitialsCashList.push(actorDtoIn);
                } else {
                  actorObjectList.push(existingActor);
                }
              }
            }
          }

          const movieDtoIn = {
            title: movieObjectItem.Title,
            year: parseInt(movieObjectItem['Release Year']),
            format: movieObjectItem.Format,
          };


          const newMovieObject =await Movie.create(movieDtoIn, {transaction});

          for (let actorObjectListIndex = 0; actorObjectListIndex < actorObjectList.length; actorObjectListIndex++) {
            const actorObject = actorObjectList[actorObjectListIndex];
            await newMovieObject.addActor(actorObject, {through: {selfGranted: false}, transaction});
          }
        }

        await transaction.commit();
        res.json({uploadedIndexList, notUploadedIndexList});
      } catch (error) {
        await transaction.rollback();
        res.status(500).json({message: messages.error.transactionErrRollback, error: error.message});
      }
    });
  }
}

module.exports = new ImportMovieAbl();
