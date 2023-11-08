const express = require('express');
const app = express();
const dotenv = require('dotenv');
import UserModel from '../database/models/user.model';
import GamesModel from '../database/models/games.model';
import CommentModel from '../database/models/comment.model';
const jwt = require('jsonwebtoken');
const path = require('path');

app.use(express.json());

app.use((req: any, res: any, next: any) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
  res.header('Access-Control-Allow-Headers', 'Content-Type');
  next();
});

dotenv.config();

const frontendBuildPath = path.join(__dirname, '../../../frontend/build');

app.use('/static', express.static(path.join(frontendBuildPath, 'static')));
app.get('/', (req: any, res: any) => {
  const indexPath = path.join(frontendBuildPath, 'index.html');
  console.log('Sending index.html from path:', indexPath);
  res.sendFile(indexPath);
});

/* Autenticação por token (avaliar se é necessario)  */

const verifyToken = (req: any, res: any, next: any) => {
  const token = req.cookies.token;

  if (!token) {
    return res.status(401).json({ error: 'Acesso não autorizado!' });
  }

  try {
    const decoded = jwt.verify(token, 'chave-token');
    req.user = decoded;
    next();
  } catch {
    return res.status(401).json({ error: 'Token inválido' });
  }
};

app.get('/api/verificar-autenticacao', verifyToken, async (req: any, res: any) => {
  try {
    const userId = req.user.id;

    const user = await UserModel.findById(userId);

    if (!user) {
      return res.status(401).json({ error: 'Usuário não encontrado' });
    }

    res.json({ loggedIn: true, name: user.name });
  } catch (error: any) {
    console.error('Erro ao verificar autenticação:', error);
    res.status(500).json({ error: error.message });
  }
});

app.post('/api/login', async (req: any, res: any) => {
  const { username, password } = req.body;

  try {
    const user = await UserModel.findOne({ username: username, password: password });

    if (!user) {
      res.status(401).json({ error: 'Credenciais Inválidas!' });
    } else {
      const token = jwt.sign({ id: user._id, username: user.username }, 'chave-token');
      res.cookie('token', token, { httpOnly: true });
      res.json({ token, loggedIn: true });
    }
  } catch (error: any) {
    console.error('Erro ao verificar credenciais!', error);
    res.status(500).json({ error: error.message });
  }
});

// GETS
app.get('/api/users', async (req: any, res: any) => {
  try {
    const users = await UserModel.find({});

    res.status(200).json(users);
  } catch (error: any) {
    return res.status(500).send(error.message);
  }
});

app.get('/api/users/:id', async (req: any, res: any) => {
  try {
    const id = req.params.id;
    const user = await UserModel.findById(id);

    return res.status(200).json(user);
  } catch (error: any) {
    return res.status(500).send(error.message);
  }
});

app.get('/api/games', async (req: any, res: any) => {
  try {
    const posts = await GamesModel.find({});

    res.status(200).json(posts);
  } catch (error: any) {
    return res.status(500).send(error.message);
  }
});

app.get('/api/games/:id', async (req: any, res: any) => {
  try {
    const id = req.params.id;
    const post = await GamesModel.findById(id);

    return res.status(200).json(post);
  } catch (error: any) {
    return res.status(500).send(error.message);
  }
});

app.get('/api/games/:id/comments', async (req: any, res: any) => {
  try {
    const postId = req.params.id;
    const comments = await CommentModel.find({ postId: postId });

    res.status(200).json(comments);
  } catch (error: any) {
    res.status(500).send(error.message);
  }
});

app.get('/api/users/:user/games', async (req: any, res: any) => {
  const userId = req.params.user;

  try {
    const user = await UserModel.findById(userId).populate('starredGames');
    if (user) {
      const favoriteGames = user.favoriteGames;

      res.status(200).json(favoriteGames);
    }
  } catch (error) {
    res.status(500).send('Couldnt get the favorite games: ' + error);
  }
});

// POSTS

app.post('/api/users', async (req: any, res: any) => {
  try {
    const user = await UserModel.create(req.body);

    res.status(201).json(user);
  } catch (error: any) {
    res.status(500).send(error.message);
  }
});

app.post('/api/games', async (req: any, res: any) => {
  try {
    const post = await GamesModel.create(req.body);

    res.status(201).json(post);
  } catch (error: any) {
    return res.status(500).send(error.message);
  }
});

app.post('/api/games/:id/comments', async (req: any, res: any) => {
  try {
    const postId = req.params.id;
    const comment = await CommentModel.create({
      text: req.body.text,
      postId: postId,
    });

    res.status(201).json(comment);
  } catch (error: any) {
    res.status(500).send(error.message);
  }
});

app.post('/api/users/:user/games/:game/star', async (req: any, res: any) => {
  const userId = req.params.user;
  const gameId = req.params.game;

  try {
    await GamesModel.updateOne({ _id: gameId }, { $inc: { stars: 1 } });

    const user = await UserModel.findById(userId);

    if (user) {
      user.favoriteGames.push(gameId);
      await user.save();
    }

    res.status(200).send('Starred!.');
  } catch (error) {
    res.status(500).send('error favoriting the game: ' + error);
  }
});

// PATCHS

app.patch('/api/users/:id', async (req: any, res: any) => {
  try {
    const id = req.params.id;
    const users = await UserModel.findByIdAndUpdate(id, req.body, { new: true });

    res.status(200).json(users);
  } catch (error: any) {
    res.status(500).send(error.message);
  }
});

app.patch('/api/games/:id', async (req: any, res: any) => {
  try {
    const id = req.params.id;
    const post = await GamesModel.findByIdAndUpdate(id, req.body, { new: true });

    if (!post) {
      return res.status(404).json({ error: 'Post not found' });
    }

    res.status(200).json(post);
  } catch (error: any) {
    res.status(500).send(error.message);
  }
});

app.patch('/api/games/:postId/comments/:commentId', async (req: any, res: any) => {
  try {
    const postId = req.params.postId;
    const commentId = req.params.commentId;

    const updatedComment = await CommentModel.findByIdAndUpdate(commentId, req.body, { new: true });

    res.status(200).json(updatedComment);
  } catch (error: any) {
    res.status(500).send(error.message);
  }
});

// DELETES

app.delete('/api/users/:id', async (req: any, res: any) => {
  try {
    const id = req.params.id;
    const user = await UserModel.findByIdAndRemove(id);

    res.status(200).json(user);
  } catch (error: any) {
    res.status(500).send(error.message);
  }
});

app.delete('/api/games/:id', async (req: any, res: any) => {
  try {
    const id = req.params.id;
    const user = await GamesModel.findByIdAndRemove(id);

    res.status(200).json(user);
  } catch (error: any) {
    res.status(500).send(error.message);
  }
});

app.delete('/api/games/:postId/comments/:commentId', async (req: any, res: any) => {
  try {
    const commentId = req.params.commentId;

    await CommentModel.findByIdAndRemove(commentId);

    res.status(204).send();
  } catch (error: any) {
    res.status(500).send(error.message);
  }
});

app.listen(process.env.PORT || 8080, () => {
  console.log(`running on port: ${process.env.PORT || 8080}`);
});
