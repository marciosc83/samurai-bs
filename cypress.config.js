const { defineConfig } = require("cypress")
const { Pool } = require('pg')

module.exports = defineConfig({
  e2e: {
    setupNodeEvents(on, config) {
      const pool = new Pool({
        host: 'lallah.db.elephantsql.com',
        user:'ocbwvvui',
        password:'1nSWuI74ZuB2PU0-Oet5TbDl8EXEoyIw',
        database: 'ocbwvvui',
        port: 5432
      })

      on('task', {
        removeUser(email){
          return new Promise(function(resolve){
            pool.query('DELETE FROM public.users WHERE email = $1', [email], function(error, result){
              if(error){
                throw error
              }
              resolve({success: result})
            })
          })
        }
      })
    },
    "baseUrl": "http://localhost:3000/",
    "chromeWebSecurity": false,
    "viewportWidth":1440,
    "viewportHeight":900
  },
});
