package db

import (
	"context"
	"time"

	"go.mongodb.org/mongo-driver/bson/primitive"
	"go.mongodb.org/mongo-driver/mongo"
)

type UserModel struct {
	ID        primitive.ObjectID `bson:"_id"`
	FirstName string             `bson:"first_name"`
	LastName  string             `bson:"last_name"`
	Email     string             `bson:"email"`
	Password  string             `bson:"password"`
}

func GetCollection() *mongo.Collection {
	return Database.Collection("users")
}

func CreateUser(firstName string, lastName string, email string, password string) (*UserModel, error) {
	collection := GetCollection()
	user := &UserModel{
		ID:        primitive.NewObjectID(),
		FirstName: firstName,
		LastName:  lastName,
		Email:     email,
		Password:  password,
	}

	ctx, cancel := context.WithTimeout(context.Background(), 5*time.Second)

	_, err := collection.InsertOne(ctx, user)

	cancel()

	if err != nil {
		return nil, err
	}

	return user, nil
}

func FindUserByUsername(username string) {
	mongo.Collection
}
