![Main](https://github.com/ddsoyka/superstring/workflows/Main/badge.svg)
![Release](https://github.com/ddsoyka/superstring/workflows/Release/badge.svg)

# Superstring

This is a web application which is designed to generate and manipulate data in varying formats. It is served securely at [superstring.tools](https://superstring.tools), or the application can be hosted locally within your own network using virtually any HTTP server software (e.g. NGINX, Apache).

# Docker

This application comes with a reference Dockerfile which bundles the application resources into a layer which is served by NGINX.

## Build

To build a docker image from this repository and serve the resulting content:

```
docker build -t ddsoyka/superstring:latest .
```

## Pull

To pull a prebuilt image from the [Docker Hub](https://hub.docker.com/r/ddsoyka/superstring):

```
docker pull ddsoyka/superstring:latest
```

## Serve

To serve the application from your machine on port `3000`:

```
docker run --rm -d -p 3000:80 ddsoyka/superstring:latest
```

# Languages

- **English**

# Credits

- *Various Authors* for graphic assets; work exhibited at [Flaticon](https://www.flaticon.com).
- Daniel Douglas Soyka for code contributions.
