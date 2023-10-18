const { application } = require('express');
const express = require('express');
const UserModel = require('../database/models/user.model');
const GamesModel = require('../database/models/games.model');
const CommentModel = require('../database/models/comment.model');
const dotenv = require('dotenv');
const port = 8080;

const path = require('path');

const app = express();
app.use(express.json());

dotenv.config();

/* Autenticação por token (avaliar se é necessario)

const verifyToken = (req, res, next) => {
    const token = req.cookies. token;

    if(!token) {
        return res.status(401).json({ error: 'Acesso não autorizado!' });
    }

    try{
        const decoded = jwt.verify(token, 'chave-token');
        req.user = decoded;
        next();
    }catch{
        return res.status(401).json({error: 'Token inválido'});
    }
}

app.get('/verificar-autenticacao', verifyToken, async (req, res) => {
    try {
      const userId = req.user.id;
  
      const user = await UserModel.findById(userId);
  
      if (!user) {
        return res.status(401).json({ error: 'Usuário não encontrado' });
      }
  
      res.json({ loggedIn: true, name: user.name, isAdmin: user.isAdmin });
    } catch (error) {
      console.error('Erro ao verificar autenticação:', error);
      res.status(500).json({ error: error.message });
    }
  });

  */



const frontendBuildPath = path.join(__dirname, '../../frontend/build');

//se for SinglePageApp, pegar todas as views e colocar identica a essa abaixo (mudando a rota "/")
app.use("/static", express.static(path.join(frontendBuildPath, "static")));
app.get("/", (req, res) => {
    res.sendFile(path.join(frontendBuildPath, "index.html"));
});

// GETS
app.get('/users', async (req,res)=>{
    try {
        const users = await UserModel.find({});

        res.status(200).json(users); 
    } catch (error) {
        return res.status(500).send(error.message);
    }

});
 
app.get("/users/:id", async (req, res) =>{
    try {
        const id = req.params.id;
        const user = await UserModel.findById(id);

        return res.status(200).json(user); 
    } catch (error) {
        return res.status(500).send(error.message);
    }
});

app.get("/games", async (req,res)=>{
    try {
        const posts = await GamesModel.find({})

        res.status(200).json(posts)
    } catch (error) {
        return res.status(500).send(error.message);
    }
})

app.get("/games/:id", async (req,res)=>{
    try {
        const id = req.params.id;
        const post = await GamesModel.findById(id);

        return res.status(200).json(post); 
    } catch (error) {
        return res.status(500).send(error.message);
    }
})

app.get("/games/:id/comments", async(req,res)=>{
    try {
        const postId = req.params.id;
        const comments = await CommentModel.find({ postId: postId });
    
        res.status(200).json(comments);
    } catch (error) {
        res.status(500).send(error.message);
    }
})

// POSTS

// Verificar se o sistema precisa (criar usuários pra gente)
app.post('/users', async (req,res) =>{
    try{
        const user = await UserModel.create(req.body);

        res.status(201).json(user);
    }
    catch(error){
        res.status(500).send(error.message);
    }
});


app.post('/games', async (req,res)=>{
    try {
        const post = await GamesModel.create(req.body);

        res.status(201).json(post);
    } catch (error) {
        return res.status(500).send(error.message);
    }
})

app.post('/games/:id/comments', async (req, res) => {
    try {
      const postId = req.params.id;
      const comment = await CommentModel.create({
        text: req.body.text,
        postId: postId,
      });
  
      res.status(201).json(comment);
    } catch (error) {
      res.status(500).send(error.message);
    }
});

// PATCHS

app.patch('/users/:id', async (req, res) =>{
    try {
        const id = req.params.id;
        const users = await UserModel.findByIdAndUpdate(id, req.body, {new: true});

        res.status(200).json(users);
    } catch (error) {
        res.status(500).send(error.message);
    }
})

app.patch('/games/:id', async (req, res) => {
    try {
      const id = req.params.id;
      const post = await GamesModel.findByIdAndUpdate(id, req.body, { new: true });

      if (!post) {
        return res.status(404).json({ error: 'Post not found' });
      }
  
      res.status(200).json(post);
    } catch (error) {
      res.status(500).send(error.message);
    }
});

app.patch('/games/:postId/comments/:commentId', async (req, res) => {
    try {
      const postId = req.params.postId;
      const commentId = req.params.commentId;
  
      const updatedComment = await CommentModel.findByIdAndUpdate(
        commentId,
        req.body,
        { new: true }
      );
  
      res.status(200).json(updatedComment);
    } catch (error) {
      res.status(500).send(error.message);
    }
  });

// DELETES

app.delete('/users/:id', async (req, res)=>{
    try {
        const id = req.params.id;
        const user = await UserModel.findByIdAndRemove(id);

        res.status(200).json(user);
    } catch (error) {
        res.status(500).send(error.message);
    }
})

app.delete('/games/:id', async (req, res)=>{
    try {
        const id = req.params.id;
        const user = await GamesModel.findByIdAndRemove(id);

        res.status(200).json(user);
    } catch (error) {
        res.status(500).send(error.message);
    }
})

app.delete('/games/:postId/comments/:commentId', async (req, res) => {
    try {
      const commentId = req.params.commentId;
  
      await CommentModel.findByIdAndRemove(commentId);
  
      res.status(204).send();
    } catch (error) {
      res.status(500).send(error.message);
    }
});



app.listen(process.env.PORT || port, () => {
    console.log(`running on port:${process.env.PORT || port}`);
});