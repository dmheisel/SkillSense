const express = require('express');
const pool = require('../modules/pool');
const {
	rejectUnauthenticated
} = require('../modules/authentication-middleware');
const router = express.Router();

router.get('/', (req, res) => {
    // console.log('req.user:', req.user.id)
    // console.log('req.params', req.params)
    const queryText = `SELECT "skill_tags".id, "skill_tags".tag FROM "user_tags"
                        JOIN "skill_tags" on "user_tags".tag_id = "skill_tags".id
                        WHERE "user_tags".user_id = $1`;
    // console.log('in userskills router GET')
    // console.log(userId)
    pool.query(queryText, [req.user.id])
        .then((result) => {
            res.send(result.rows)
        }).catch((error) => {
            console.log(error);
            res.sendStatus(500);
        })
})

// route to POST new skill into users list of skills
router.post('/', rejectUnauthenticated, (req, res) => {
    const userId = req.user.id;
    const tagId = req.body.id;
    const sqlText = `INSERT
        INTO "user_tags"
            (tag_id, user_id)
        VALUES
            ($1, $2);`
    pool.query(sqlText, [tagId, userId])
        .then(result => {
            console.log('successful add of user skill into db')
            res.sendStatus(200)
        })
        .catch(error => {
            console.log('error on adding user skill into db: ', error);
            res.sendStatus(500)
        })
});

//route to DELETE skill from user's list of skills
router.delete('/:id', rejectUnauthenticated, (req, res) => {
    const tagId = req.params.id;
    const userId = req.user.id;
    const sqlText = `DELETE *
        FROM "user_tags"
        WHERE (tag_id = $1) AND (user_id = $2);`

    pool.query(sqlText, [tagId, userId])
        .then(result => {
            console.log('successful delete of user skill from db')
            res.sendStatus(204)
        })
        .catch(error => {
            console.log('error on deleting user skill from db: ', error);
            res.sendStatus(500);
        })
})

module.exports = router;
