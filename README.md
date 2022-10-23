# Wishlist

## Quickstart

sudo docker run --name=wishlist --volume=/home/pascal/wishlist:/app/data  -p 4576:3000 --restart=unless-stopped netpascal0123/wishlist:0.0.2

http://127.0.0.1:4576

## Develop

This project has been initialized with [the material-ui next starter](https://github.com/mui/material-ui):


Install it and run:

```sh
npm install
npm run dev
```

## Proxy https

```
npm install -g local-ssl-proxy
local-ssl-proxy --source 9001 --target 4576
```