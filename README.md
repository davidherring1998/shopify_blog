# Shopify Development Blog


## Description
The Shopify Development Blog is a platform built for users to create and share blog posts about Shopify development. This includes information about Remix, Liquid templating engine, Shopify news, and Shopify partners. The app aims to foster a community where Shopify developers can exchange knowledge, tips, and insights.


## Installation
### Prerequisites
- Node.js
- npm (Node Package Manager)
- SQLite
- Prisma CLI (optional for database migrations)
- A `.env` file with `DATABASE_URL` and `SESSION_SECRET` variables.

### Steps
1. **Clone the Repository**
2. **Install Dependencies**
3. **Set Up Environment Variables**
- Create a `.env` file in the root directory.
- Add the following lines, replacing the placeholders with your actual database URL and session secret:
  ```
  DATABASE_URL="your_database_url"
  SESSION_SECRET="your_session_secret"
  ```

4. **Database Setup**
- If using Prisma, run the following command to migrate your database:
  ```
  npx prisma migrate dev
  ```

5. **Start the Server**



## Usage

### Creating an Account
- Creating a new account can be executed on the signup page and can be accessed from the homepage, post page (by clicking on a post), or the login page. 
- Create the username (minimum of 3 characters) and password minimum of 5 characters. 

### Posting a Blog
- Once logged in, navigate to the "Post" page in the navigation.
- Click the "Create" post button
- Fill in the details of your blog post and submit.

### Viewing and Deleting Posts
- Browse through various blog posts from the post page and the homepage.
- You can delete your posts using the delete button available on your unique post pages.

## Features
- Built with the latest Remix framework.
- Uses SQLite for lightweight and efficient data management.
- Prisma ORM for easy database management.
- React Icons for enhanced UI elements.
- User authentication for personalized experiences.
- Capabilities to create, view, and delete blog posts.

## Contributing
Contributions to the Shopify Development Blog are welcome! Please feel free to fork the repository, make your changes, and submit a pull request.

## Contact
For support or any queries, please contact davidherringmiddletn@gmail.com












![Homescreen_view](https://github.com/davidherring1998/shopify_blog/assets/106282330/f1079b55-aa51-46dd-a7ab-266d2a317d6f)
<img width="1414" alt="login_view" src="https://github.com/davidherring1998/shopify_blog/assets/106282330/a95a3662-776f-46f3-9f95-8a9ad2aaea34">
<img width="1414" alt="Postlist_view" src="https://github.com/davidherring1998/shopify_blog/assets/106282330/0b3f5546-89c6-42e4-957f-c87d64e5a958">
<img width="1414" alt="create_view" src="https://github.com/davidherring1998/shopify_blog/assets/106282330/47e48389-1135-4a00-96ac-b4e9e4521db7">
<img width="1414" alt="personalpost_view" src="https://github.com/davidherring1998/shopify_blog/assets/106282330/1e3c4e81-7801-4ef8-aa95-432245fb3ea3">
<img width="1414" alt="post_view" src="https://github.com/davidherring1998/shopify_blog/assets/106282330/136814a0-5cdd-4f25-80f1-bd598204609a">
<img width="1414" alt="signup_view" src="https://github.com/davidherring1998/shopify_blog/assets/106282330/6432e100-3ead-4225-9012-44feda9e412b">
