# budget-better
Budgeting better with our Ca$h bot 

# Set up the app

in the root directory, run the following command to install the dependencies:

```
npm install
``` 


Set up environment variables:

Create a .env file in the server directory.

Add the following environment variables to the .env file:
```
PLAID_CLIENT_ID=your_plaid_client_id
PLAID_SECRET=your_plaid_secret
PLAID_ENV=sandbox
PLAID_COUNTRY_CODES=US,CA
PLAID_PRODUCTS=auth,transactions
PLAID_REDIRECT_URI=

```

## Test the App
in the root directory, run the following command to start the app:

```
npm start
```
Open your web browser and visit http://localhost:3000.

Click on the "Link account" button to initiate the Plaid Link flow.

On the Plaid Link popup, enter the following credentials:
```
Username: user_good
Password: pass_good
Confirmation code: 1234
```
Follow the instructions provided by the Plaid Link flow to complete the bank account connection process.

Once the connection is successful, you will see the account balance and details displayed on the page.