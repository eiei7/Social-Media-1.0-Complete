
# Social-Media-1.0-Complete

## 👉Introduction
  Social Media 1.0 is a full stack web application which mainly depends on MySQL, ExpressJS, React, and NodeJS technologies.

  It has been deployed on the Netlify, here is the link of the website.
  
  👉https://63903b7d042b404f50a5a69b--chipper-malabi-72c573.netlify.app/
 
  However, the items won't give any reaction when you click them.
  
  It can only work on my local device (because of server part haven't been deployed).

### 🧾File Structure
    Social Media 1.0
       |
       |___client
       |       |______node_modules
       |       |______public
       |       |         |_________assets
       |       |         |_________unimportant files
       |       |
       |       |______src
       |       |         |_________components
       |       |         |             |_________FlexBetween.jsx
       |       |         |                       Friendship.jsx
       |       |         |                       UserImage.jsx
       |       |         |                       WidgetWrapper.jsx
       |       |         |_________scenses
       |       |         |              |________HomePage.jsx
       |       |         |              |
       |       |         |              |________LoginPage.jsx
       |       |         |              |        Form.jsx
       |       |         |              |        
       |       |         |              |________Navbar.jsx
       |       |         |              |        HelperText.jsx
       |       |         |              |
       |       |         |              |________ProfilePage.jsx
       |       |         |
       |       |         |_________state
       |       |         |            |__________index.js
       |       |         |           
       |       |         |_________widgets
       |       |                      |__________AdverWidget.jsx(Optional)
       |       |                                 FriendListWidget.jsx
       |       |______.gitignore                 MyPostWidget.jsx
       |               package.json              PostsWidget.jsx
       |               package-lock.json         PostWidget.jsx
       |               README.md                 UserWidget.jsx
       |___server
               |______node_modules
               |
               |______controllers
               |            |_______auth.js
               |                    comments.js
               |                    likes.js
               |                    posts.js
               |                    user.js
               |______data
               |         |__________Queries.js
               |
               |______middleware
               |         |__________auth.js
               |
               |______public
               |         |__________assets(include imags)
               |       
               |______routes
               |         |__________auth.js
               |                    comments.js
               |                    likes.js
               |                    posts.js
               |______db.js         users.js
                      index.js
                      .env(hidden)
                      .gitignore
                      package.json
                      package-lock.json
                      
 
 ### 📌Dependencies 
     (copy and paste 👇)
     
     1. For client: 
     npm i react-redux @reduxjs/toolkit redux-persist react-dropzone dotenv formik yup 
     react-router-dom @mui/material @emotion/react @emotion/styled @mui/icons-material 
     react-input-emoji react-card-flip axios
     
     2. For server: 
     npm i express body-parser bcrypt cors dotenv gridfs-stream multer multer-gridfs-storage 
     helmet morgan jsonwebtoken nodemon cookie-parser moment mysql
     
  ### Design of MySQL Database
  
     👉picture 
     <iframe width="560" height="315" src='https://dbdiagram.io/embed/63946d48bae3ed7c4545f6c9'> </iframe>
     
     👉Logic 
     
     What can user do ?
     
       Add their details – (FirstName, LastName, Gender, Date of Birth, Email, Password, Occupation, profilePicture, etc).
       Write multiple posts with text/image/emoji.
       Show / Hide image dropzone.
       View followed object's posts.
       View followed lists / followers lists (flippable).
       Like / DisLike(Cancel Like) others’ posts.
       View posts' comments.
       Show / Hide posts' comments.
       View others' personal profile page.
       Follow / Disfollow followed objects (cannot disfollow his followers).
     
     How to fetch data logically?
     
       Check Queries.js file !
     
     👉Code 
     
       Check Mysql.sql
       
  ### Logic & Relationship between each components/file
  
      I'll describe it in detail later.
     
  ### 🔍Realized Functions 
  
      #### What can you do? 📢
      
      👉Create a new post with text, emoji, or picture.
      👉Click to dropzone to upload your local picture or pull an image from
        internet on dropzone.
      👉Flip followedList to check your follwers.
      👉Your homepage shows all the posts include yours and your followed
        objects.
      👉Click heart icon which represents like or remove like for any post.
      👉Click message icon to check all the message of a post.(If there's no
        message left it won't react.)
      👉Click your followed object's name, and then you'll be brought to your
        followed object's personal profile.
      
      #### How to logout ? 👣
      
      👉Click menue item, and then click the second item (top right).
      
      #### Want to explore more ? 🤓
      
      👉Try to click some unique icon.
      
   ### The end 📌
   
      Thank you for visiting my website and my repositery. 
      
      Feel free to ask any tech question that you might be faced after you clone locally and start to deploy your own social media app!
      
      I'll keep exploring more functions of a social network app.👍
      
      
      
