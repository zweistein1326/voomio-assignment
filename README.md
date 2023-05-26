# assignment

## Rationale

This assignment is designed to explore your overall abilities in: 
- TS/Node.js/React
- Project setup
- Communication/Documentation
- Learning/understanding/implementing fast
- Working autonomously
- Working under time constraints and pressure
- Writing accurate/readable/performant code

## Assignment

The assignment is to build a very simple app that has two features for the users:

1. Display real-time Ethereum price
2. Display real-time Gas price (in Ethereum)

Here are minimum technical/logistical requirements for the assignment:

1. create a new _private_ repository called 'voomio-assignment' on your own GitHub account. Invite [@9oelm](https://github.com/9oelm) and [@vootechlol](https://github.com/vootechlol) as collaborators. `git clone` and work on this repo. 
1. The repository should contain all BE + FE code together in an organized way
1. The repository should be entirely be written in TypeScript, except for files that by nature are in JavaScript (ex. `.eslintrc.js`)
1. Make the best use of TypeScript. Stick to strict typings wherever possible.
1. The FE must be written in the most modern Next.js + React. 
1. The BE can be written in any frameworks or libraries of your choice in TS/JS ecosystem.
1. The BE ↔️ FE communication only happens through WebSocket. Ideally, BE should constantly update Ether/Gas price by publishing changes via WebSocket in FE. And FE would update its value accordingly to show to the user.
1. For the sake of simplicity, do not create any DB. Store all information in BE server in-memory (for example, in an object or dictionary variable) and send it to FE. Consider BE server to be just ephemeral. We are not going to deploy this app. It's only for local testing.
1. FE UI/UX is left to you, except that the app should only have a single page. But no need to make fancy stuff. Visual beauty is not a consideration for this assignment. Just make it easy to recognize what's happening.
1. You can use any libraries/APIs out there as long as they help. But you need to have a clear rationale on why. The authenticity of Ether/Gas price coming from centralized APIs isn't that important as long as the project just works. 
1. Organize the project structure/folders/settings/tools in the most efficient, helpful way.
1. Recommended Node version is `v18.16.0`.
1. Write a `README.md` explaining setup instructions and any peculiarities or anything important or relevant. Imagine other developers will need to setup, use and add to your codebase.
1. Organize your commit messages semantically and reasonably.
1. Do not be complacent for the working code; but rather show the best version of yourself and write the best code.
1. This assignment is expected to be finished within 48-72 hours. 
1. If you have completed all these steps, tell us on Discord.

Bonus:
1. The entire codebase (BE + FE) runs on docker, to eliminate differences and intricacies in different developer environments

The requirements must be quite clear, and other parts that are not specifically mentioned are within the range of your freedom.

However if you face any questions, please ask via Discord. But immediate, detailed response is not guaranteed.
