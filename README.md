# Next Apollo Material-ui


## Step 1. Setup server

Clone [case-study-apollo-server
](https://github.com/DmitryMironchenko/case-study-apollo-server)

Install dependencies:

`yarn`

Then run the server:

`node server.js`

## Step 2. Set server url

Copy [.env.local.example](./.env.local.example) to [.env.local](./.env.local)

The content should be something like: 

`NEXT_PUBLIC_API_URL=http://localhost:4000/`

## Step 3. Install

`yarn install`

## Step 4. Run development

`yarn dev`

## Step 5. Build for production

`yarn build`
