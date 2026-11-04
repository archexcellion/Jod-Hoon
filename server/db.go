package main

import (
	"database/sql"
	"log"
	"time"

	_ "github.com/lib/pq"
)

var db *sql.DB

// initDB initializes the database connection using the provided database URL.
func initDB(dbURL string) (*sql.DB, error) {
	if dbURL == "" {
		return nil, nil
	}

	conn, err := sql.Open("postgres", dbURL)
	if err != nil {
		return nil, err
	}

	conn.SetMaxOpenConns(10)
	conn.SetMaxIdleConns(5)
	conn.SetConnMaxLifetime(5 * time.Minute)

	if err := conn.Ping(); err != nil {
		log.Printf("Warning: DB ping failed on startup: %v", err)
	} else {
		log.Println("Database connection established")
	}

	return conn, nil
}
