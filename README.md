# paid-dapp

## Prerequisites

Integration Metamask

### Local dependencies
- Docker
- Make
- Node
### Env variables 

Copy `.env.example` to `.env` and replace to the proper values

## Getting Started
### Using Docker (Recommended)

Build a new docker image and start a new container afterwards.
```bash
make up
```

Remove a previous container 
```bash
make down
```

Get container logs
```bash
make logs
```

### Using Node

Install application dependencies

```bash
npm i --force
```

Run the application

```bash
npm start
```

To create or sign Agreements make sure to have PAID tokens balance

### Change Log
* Web3 Provider
* Ethers Provider
* Onboard.js Library
