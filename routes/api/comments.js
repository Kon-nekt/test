var express = require('express');
var request = require('request')
var router = express.Router();
var Authors = require('../../models/authors');
var Words = require('../../models/words')

const { PerformanceObserver, performance } = require('perf_hooks');

router.post('/', function(req, res, next) {
  request('https://jsonplaceholder.typicode.com/comments', (err, response, body) => {
    if(err)
      return res.status(500).send({message: err});
      else
      {
        let time = performance.now();
        let comments = JSON.parse(body);
        let author = new Authors(comments).getAuthor();
        let words = new Words(comments).getPopularWords();
        time = performance.now() - time;
        res.json(
          {
            popularAuthor: {
              email: author[0],
              comments: author[1]
            },
            popularWords: {
              words
            },
           executionTime: time
          }
        )
        
      }
  });
});
module.exports = router;
