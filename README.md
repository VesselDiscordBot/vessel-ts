# My Template for [sapphire framework](sapphirejs.dev/)

This is the template that all my [Discord](https://discord.com) bots use

## How to use it?

### Windows
```powershell
New-Item -ItemType Directory <name> | Set-Location
npx degit badstagram/sapphire-template
```

### Linux / MacOS
```bash
mkdir <name>
cd <name>
npx degit badstagram/sapphire-template
```

### Install Dependencies  

```sh
pnpm install
```

### Development

```sh
pnpm run watch:start
```

### Production

You can also run the bot with `pnpm build`, this will first build your code and then run `pnpm run start`. But this is not the recommended way to run a bot in production.

## License
MIT License
