package utils

import (
	"fmt"
	"log"
	"os"
	"time"

	"github.com/golang-jwt/jwt"
)

type JwtToken struct {
	PublicKey  string
	PrivateKey string
	issuer     string
}

type UserClaims struct {
	ID        string `json:"id"`
	FirstName string `json:"firstName"`
	LastName  string `json:"lastName"`
	Title     string `json:"title"`
	jwt.StandardClaims
}

func JwtInstance() *JwtToken {
	publicKey := os.Getenv("JWT_PUBLIC_KEY")
	privateKey := os.Getenv("JWT_PRIVATE_KEY")

	return &JwtToken{
		PublicKey:  publicKey,
		PrivateKey: privateKey,
		issuer:     "KU Task",
	}
}

func (j *JwtToken) Sign(id string, title string, firstName string, lastName string) (string, error) {
	claims := &UserClaims{
		ID:        id,
		FirstName: firstName,
		LastName:  lastName,
		Title:     title,
	}

	key, err := jwt.ParseECPrivateKeyFromPEM([]byte(j.PrivateKey))

	if err != nil {
		log.Panicf("Create Parsed Key Error %v", err)
		return "", err
	}

	claims.ExpiresAt = time.Now().Add(time.Hour * 24).Unix()
	claims.Issuer = j.issuer

	token, err := jwt.NewWithClaims(jwt.SigningMethodES256, claims).SignedString(key)

	if err != nil {
		return "", err
	}

	return token, nil
}

func (j *JwtToken) Verify(token string) (*UserClaims, error) {
	key, err := jwt.ParseECPublicKeyFromPEM([]byte(j.PublicKey))
	if err != nil {
		fmt.Errorf("Create Parsed Key Error %v", err)
		return nil, err
	}

	jwtToken, err := jwt.ParseWithClaims(token, &UserClaims{}, func(t *jwt.Token) (interface{}, error) {
		return key, nil
	})

	if err != nil {
		fmt.Errorf("ParseWithClaims Error %v", err)
		return nil, err
	}

	userClaims := jwtToken.Claims.(*UserClaims)
	return userClaims, nil
}
