const { MongoClient } = require('mongodb');
const { v4: uuidv4 } = require('uuid');
const { faker } = require("@faker-js/faker");
const fs = require('fs');

const url = 'mongodb://bootcampuser:bootcamppass@localhost:27017/game_score_db';
const dbName = 'game_score_db';

const insertDocs = async () => {
  const client = new MongoClient(url);
  
  try {
    await client.connect();
    console.log("Server OK");
    
    const db = client.db(dbName);
    const scoresCollection = db.collection('scores');
    const usersCollection = db.collection('users');
    
    let documents = [];
    
    for (let i = 0; i < 200000; i++) {
      const userId = uuidv4();
      const username = faker.internet.username();
      const email = faker.internet.email();
      const profile = {
        level: Math.floor(Math.random() * 100) + 1,
        avatar: faker.image.avatar(),
        country: faker.location.country(),
        bio: `Jugador número ${faker.string.alphanumeric()}`
      };
      const stats = [
        { game: "Pac Man", score: Math.floor(Math.random() * 500000) + 1000 },
        { game: "Mario Bro.", score: Math.floor(Math.random() * 500000) + 1000 },
        { game: "Tetris", score: Math.floor(Math.random() * 880008) + 1000 }
      ];
      const friends = [];
      
      documents.push({ userId, username, email, profile, stats, friends });
    }
    
    let users = documents.map((user, index) => {
      const userUpdate = {...user};
      userUpdate.friends = Array.from({ length: Math.floor(Math.random() * 100) },
        () => documents[Math.floor(Math.random() * 100000)].userId);
      return userUpdate;
    });
    
    const resultUpdate = await usersCollection.insertMany(users);
    console.log(`Insert ${resultUpdate.insertedCount} documents in 'users'`);
    
    const games = ["Mario Bros.", "Mario Bros. 3", "Zelda", "Call of Duty", "Tetris"];
    
    let scoreDocuments = [];
    for (let i = 0; i < 200000; i++) {
      const status = true;
      const userId = documents[Math.floor(Math.random() * documents.length)].userId;
      const scoreId = uuidv4();
      const game = games[Math.floor(Math.random() * games.length)];
      const score = Math.floor(Math.random() * 500000) + 1000;
      const date = new Date(
        2024,
        Math.floor(Math.random() * 12),
        Math.floor(Math.random() * 28) + 1
      );
      const duration = Math.floor(Math.random() * 120);
      const bonuses = [
        { type: "double points", value: Math.floor(Math.random() * 300) },
        { type: "extra life", value: Math.floor(Math.random() * 200) }
      ];
      
      scoreDocuments.push({
        userId,
        scoreId, game,
        score, date,
        duration, bonuses, status });
    }
    
    const scoreResult = await scoresCollection.insertMany(scoreDocuments);
    console.log(`Insert ${scoreResult.insertedCount} documents in 'scores'`);
  } finally {
    await client.close();
  }
};

insertDocs().catch(console.error);