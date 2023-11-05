<div align="center">
   <img src="/vite-project/public/images/logo.png" with="200" height="200" justify="center"/>
</div>

<div align="center" justify="center">
   <h2>Up 2 U Nutrition allows users to make orders, view information, and see upcoming events directly from the restaurant! </h2>
</div>
  
### Quick Links
  
<a href=https://up-2-u-nutrition.onrender.com//>Live Demo</a>
  
</div>
2. Install dependencies

      ```bash
      pipenv install -r requirements.txt
      ```

3. Rename the **.env.example** file to **.env** based on the example with proper settings for your
   development environment

4. Make sure the SQLite3 database connection URL is in the **.env** file

5. This starter organizes all tables inside the `flask_schema` schema, defined
   by the `SCHEMA` environment variable.  Replace the value for
   `SCHEMA` with a unique name, **making sure you use the snake_case
   convention**.

6. Get into your pipenv, migrate your database, seed your database, and run your Flask app

   ```bash
   pipenv shell
   ```

   ```bash
   flask db upgrade
   ```

   ```bash
   flask seed all
   ```

   ```bash
   flask run
   ```

