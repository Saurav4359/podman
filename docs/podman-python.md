---
title: Podman Python
---

# Podman Python SDK

The Podman Python SDK lets you manage containers, images, pods, and networks from Python applications using the Podman API.

## Install

```bash
pip install podman
```

## Quick example

```python
from podman import PodmanClient

with PodmanClient() as client:
    client.images.pull("quay.io/libpod/banner")
    container = client.containers.run(
        "quay.io/libpod/banner",
        detach=True,
        ports={"80/tcp": 8080},
    )
    print(container.id)
```

## When to use it

Use the Python SDK when you need programmatic control over Podman — for automation, testing, or building tools on top of the Podman API. It works with both rootful and rootless Podman when the API socket is available.

## Full documentation

API details, models, and advanced usage are maintained in the project docs:

- [Podman Python documentation](https://podman-py.readthedocs.io/en/latest/index.html)
