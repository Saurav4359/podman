---
title: Podman Networking
---

# Basic Networking with Podman

Networking is one of the first areas people explore after learning container basics. Podman supports several modes depending on whether you run rootful or rootless containers.

## Rootful vs rootless

Unprivileged users cannot create network interfaces on the host. Rootless containers default to **pasta** user-mode networking. Rootful containers default to **netavark** bridge networking, which gives containers routable IP addresses on an internal bridge.

## Common setups

### Bridge (default for rootful)

Podman creates an internal bridge network. Containers get private IPs and reach the internet through NAT. Publish ports with `-p` when services need access from outside the host:

```bash
podman run -d --name webserver -p 8080:80 quay.io/libpod/banner
curl http://localhost:8080
```

Create additional networks with `podman network create` and attach containers using `--network`.

### Macvlan (rootful only)

Macvlan attaches a container directly to a host network interface. The container gets its own MAC and IP on the same LAN as the host:

```bash
sudo podman network create -d macvlan -o parent=eth0 webnetwork
sudo podman run -d --name webserver --network webnetwork quay.io/libpod/banner
```

### Pasta (default for rootless)

Rootless containers use pasta for user-mode TCP/IP. Containers reach external networks through the host. Map host ports above 1024 to expose services:

```bash
podman run -d --name webserver -p 8080:80 quay.io/libpod/banner
```

## Containers and pods

Containers in the same **pod** share a network namespace and can talk over `localhost`. Standalone rootless containers usually communicate through published host ports.

## Firewalls

Host firewalls can block published ports. If traffic does not reach a container, check that the port is allowed and that reloading the firewall has not removed netavark rules. Use `podman network reload` to restore connectivity without restarting containers.

## Full networking guide

For diagrams, DHCP setup, and advanced examples, see the upstream networking tutorial:

- [Basic networking guide on GitHub](https://github.com/containers/podman/blob/main/docs/tutorials/basic_networking.md)
