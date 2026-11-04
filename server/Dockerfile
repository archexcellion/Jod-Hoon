FROM golang:1.24-alpine AS builder

WORKDIR /app
RUN apk add --no-cache git

COPY go.mod go.sum ./
RUN go mod download || true

COPY . .
RUN CGO_ENABLED=0 GOOS=linux go build -o /app/server .

FROM alpine:3.20

WORKDIR /app
RUN apk --no-cache add ca-certificates curl

COPY --from=builder /app/server /app/server

EXPOSE 8080
CMD ["/app/server"]
