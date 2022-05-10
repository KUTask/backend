package db

import (
	"context"
	"log"
	"os"

	"go.mongodb.org/mongo-driver/mongo"
	"go.mongodb.org/mongo-driver/mongo/options"
)

var Database *mongo.Database

func Connect() {
	uri := os.Getenv("MONGO_URI")
	if uri == "" {
		log.Fatal("MONGO_URI is not set")
	}
	option := options.Client().ApplyURI(uri)
	mongoClient, mongoError := mongo.Connect(context.TODO(), option)
	if mongoError != nil {
		log.Fatal("Mongo Connection Error", mongoError)
	}

	Database = mongoClient.Database("test")
}
