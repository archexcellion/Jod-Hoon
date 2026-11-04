package main

import (
	"encoding/json"
	"net/http"
	"time"
)

type HealthResponse struct {
	Status    string `json:"status"`
	Database  string `json:"database"`
	Timestamp string `json:"timestamp"`
}

// healthHandler checks the health of the server and database connection.
func healthHandler(w http.ResponseWriter, r *http.Request) {
	dbStatus := "connected"
	if db == nil || db.Ping() != nil {
		dbStatus = "disconnected"
	}

	w.Header().Set("Content-Type", "application/json")
	json.NewEncoder(w).Encode(HealthResponse{
		Status:    "ok",
		Database:  dbStatus,
		Timestamp: time.Now().UTC().Format(time.RFC3339),
	})
}

// stocksHandler returns a list of stock quotes in JSON format.
func stocksHandler(w http.ResponseWriter, r *http.Request) {
	quotes := getStockQuotes()
	w.Header().Set("Content-Type", "application/json")
	json.NewEncoder(w).Encode(quotes)
}
