import Express from 'express';
const User = require('../model/User');
const Game = require('../model/Game');
const Rating = require('../model/Rating');
const { JwtPayload } = require('jsonwebtoken');

export interface CustomRequest extends Express.Request {
  user: string | typeof JwtPayload;
}

// const modes = [
//   '15 seconds',
//   '30 seconds',
//   '60 seconds',
//   '120 seconds',
//   '10 words',
//   '25 words',
//   '50 words',
//   '100 words',
// ];

async function setBestGames(user: typeof User, game: typeof Game) {
  let counter = 0;
  user.bestGames.map(async (item: typeof Game, index: Number) => {
    if (item.mode === game.mode) {
      counter++;
      if (item.wpm <= game.wpm) {
        user.bestGames.splice(index, 1);
        await User.findByIdAndUpdate(user._id, {
          bestGames: user.bestGames.concat(game),
        });
      }
    }
  });
  if (counter === 0) {
    await User.findByIdAndUpdate(user._id, {
      bestGames: user.bestGames.concat(game),
    });
  }
}

async function setBestGame(user: typeof User, game: typeof Game) {
  if (!user.bestGame) {
    await User.findByIdAndUpdate(user._id, {
      bestGame: game,
    });
  } else {
    if (user.bestGame.wpm <= game.wpm) {
      await User.findByIdAndUpdate(user._id, {
        bestGame: game,
      });
    }
  }
}

async function setRating(username: String, game: typeof Game) {
  let rating = await Rating.findOne({ username: username }).populate(
    'bestGame'
  );

  if (!rating) {
    rating = new Rating({
      username: username,
      bestGame: game,
    });
    await rating.save();
  } else {
    if (rating.bestGame.wpm <= game.wpm) {
      await Rating.updateOne(
        { username: username },
        {
          bestGame: game,
        }
      );
    }
  }
}

class gameController {
  async setGame(req: CustomRequest, res: Express.Response) {
    try {
      const { wpm, accuracy, chars, mode, date } = req.body;
      const userId = req.user.id;
      const initialUser = await User.findById(userId).populate('bestGames');
      const game = new Game({
        user: userId,
        wpm: wpm,
        accuracy,
        chars,
        mode,
        date,
      });

      await game.save();

      await User.findByIdAndUpdate(userId, {
        games: initialUser.games.concat(game),
        gameCount: initialUser.gameCount + 1,
      });

      setBestGames(initialUser, game);
      setBestGame(await initialUser.populate('bestGame'), game);
      setRating(initialUser.username, game);

      return res.json();
    } catch (error) {
      res.status(405).json({ message: 'Set user error' });
    }
  }

  async getRating(req: CustomRequest, res: Express.Response) {
    try {
      const rating = await Rating.find().populate('bestGame');
 
      return res.json(
        rating.sort(
          (a: typeof Game, b: typeof Game) => b.bestGame.wpm - a.bestGame.wpm
        )
      );
    } catch (error) {
      res.status(405).json({ message: 'Get rating error' });
    }
  }
}

module.exports = new gameController();
