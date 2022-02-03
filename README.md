# Carter Consulting limited Techincal Challenge

## Instructions to run the app

Setup:
 - Clone this repository
 - Navigate to the `client` directory in your terminal
 - Run `npm install`
 - Navigate to the `server` directory in your terminal
 -  Run `npm install`
 - Create a `.env` file and give it the following attributes
  - ```sh 
        MONGO_URI=mongodb+srv://admin-deeni:muha234mmad@cluster0.n2lhm.mongodb.net/transactions
        PORT=5000
    ```
 - After the installation is complete, run `npm run dev` in server directory to start both servers concurrently (client port -3000, server port - 5000)
 - Goto http://localhost:3000 in browser

 How it works:
 - Hover over each date box to get the credit total, debit total and the Net total of the day 
 - Boxes with red are boxes that the total debit is higher than the total credit of the day
 - Boxes with green are boxes that the total credit is higher than the total debit of the day

 Happy 😊 hacking!