# Spotify Clone

School project.

**The site is in development mode in spotify so any attempt to login with an account which was not added by me will just fail.**

**But you can still configure your own website if you want.**

## Configuration

**_You should have spotify premium to play and pause songs._**

> To configure your own project you can follow these steps:

1. Login to your spotify developer dashboard.
2. Create a new app as the following _(you can name it however you want and any description you want.)_
3. You should be presented with a page like this: ![spotify dashboard](/images/spotifyDashboard.png)
4. clone this project in your terminal by running: `git clone https://github.com/Gri-ffin/spotify-clone.git`.
5. Create a .env.local file inside the cloned project.
6. Install dependencies with: `yarn install`
7. Copy the content in the `.env.example` file to `.env.local` and replace with respective values.
8. Now configure the project settings in your dashboard by clicking edit settings: ![spotify configuration](/images/spotify%20configuration.png)
   **Yours should be `yourdevelopmenturl/api/auth/callback/spotify`** or **`yourproductionurl/api/auth/callback/spotify` for you hosted site**
9. Now you can run `yarn dev` to start customizing your project.
