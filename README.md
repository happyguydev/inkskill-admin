# Getting started
1. Clone the project from git  
`git clone http://git.dominitech.com/lee/inkskill-admin.git`  
2. Make sure your node version is v8.1 and above  
`node -v`  
3. Install dependencies  
`yarn install`
4. Configure _.env_ file (if needed):
   - PORT: Adjust the port where the admin console will listen on (normally 4000)
   - No other parameter needs to be adjusted
5. Configure/Create _.env.development.local_ file (if needed):
   - REACT_APP_USER_BASE_URL: Base url for user profile pages in development environment
   (normally REACT_APP_USER_BASE_URL=http://localhost:8080/ink/)   
6. Run the koa [backend server](http://git.dominitech.com/lee/inkskill-koa/blob/master/README.md) if not done before  
7. Run the app with `yarn start`
   
Application will run on http://localhost:4000/

# Deployment
Deployment is automatic when you commit to staging or master

(Give the automatic system at least 5 minutes to complete)
