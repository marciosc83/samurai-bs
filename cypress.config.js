const { defineConfig } = require("cypress")
const { Pool } = require('pg')

module.exports = defineConfig({
  e2e: {
    setupNodeEvents(on, config) {
      const pool = new Pool({
        host: 'lallah.db.elephantsql.com',
        user: 'ocbwvvui',
        password: '1nSWuI74ZuB2PU0-Oet5TbDl8EXEoyIw',
        database: 'ocbwvvui',
        port: 5432
      })

      on('task', {
        removeUser(email) {
          return new Promise(function (resolve) {
            pool.query('DELETE FROM public.users WHERE email = $1', [email], function (error, result) {
              if (error) {
                throw error
              }
              resolve({ success: result })
            })
          })
        },
        findToken(email) {
          return new Promise(function (resolve) {
            pool.query(' SELECT B.token FROM ' +
            'public.users A ' + 
            'INNER JOIN public.user_tokens B ' +
            'ON A.id = B.user_id ' +
            'WHERE A.email = $1 ' +
            'ORDER BY B.created_at', [email], function(error, result){
              if (error) {
                throw error
              }
              resolve({ token: result.rows[0].token})
            }
            )

          })
        }
      })
    },
      "baseUrl": "https://samuraibs-web-marciosc.herokuapp.com",
      "apiServer": "https://samuraibs-api-marciosc.herokuapp.com",
      "chromeWebSecurity": false,
      "viewportWidth": 1440,
      "viewportHeight": 900,
      "defaultCommandTimeout": 30000,
      //TO DO - adicionar as configurações de banco de dados como objeto json
  },
  projectId: "oc8gsf"
});
