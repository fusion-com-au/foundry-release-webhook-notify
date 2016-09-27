# foundry-release-webhook-notify

Post to a webhook endpoint on publish.

## Install

```bash
npm i foundry-release-webhook-notify --save-dev
```

## Usage

In your `package.json`:

```json

...

"foundry": {
    "releaseCommands": [
        ...
        {
            "type": "releaseCommand",
            "command": "foundry-release-webhook-notify",
            "options": {
              "webhook": "https://ci-server.local/foo001/build/",
            }
        },
        ...
    ]
}
...
```

Without `options`, it defaults to :

```
{
    "webhook": 'http://localhost/XXXXXX/build',
    "payload": {
        "formData": {}
    },
}
```
