package main

import (
	"log"
	"net/http"
	"os"
	"time"
)

// main is the entry point of the application.
func main() {
	port := os.Getenv("PORT")
	if port == "" {
		port = "8080"
	}

	dbURL := os.Getenv("DATABASE_URL")
	if dbURL == "" {
		log.Println("Warning: DATABASE_URL environment variable is not set")
	} else {
		var err error
		db, err = initDB(dbURL)
		if err != nil {
			log.Printf("Warning: failed to initialize DB connection: %v", err)
		}
	}

	mux := http.NewServeMux()
	mux.HandleFunc("/api/health", enableCORS(healthHandler))
	mux.HandleFunc("/api/stocks", enableCORS(stocksHandler))

	server := &http.Server{
		Addr:         ":" + port,
		Handler:      mux,
		ReadTimeout:  10 * time.Second,
		WriteTimeout: 10 * time.Second,
	}

	log.Printf("Jod-Hoon Go server running on port %s", port)
	if err := server.ListenAndServe(); err != nil && err != http.ErrServerClosed {
		log.Fatalf("Server error: %v", err)
	}
}
