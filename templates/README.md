# Template Archives

The template directories in this folder remain checked into source control so you can inspect or modify them directly.

To avoid binary blobs that break automated PR tooling, the distributable `.zip` archives are stored as Base64 text files (`*.zip.base64`).

Use Node.js to materialize the archives only when you need to hand them off:

```bash
node templates/materialize-archives.mjs
```

The script recreates the `.zip` files next to their encoded counterparts. Remove the generated archives before committing new changes to keep the repository text-only.
