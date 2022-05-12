package auth

import (
	"bytes"
	"encoding/json"
	"fmt"
	"io/ioutil"
	"net/http"
	"time"

	"github.com/KUTask/backend/utils"

	"github.com/gofiber/fiber/v2"
)

type ResponseBody struct {
	AccessToken  string `json:"accesstoken"`
	RefreshToken string `json:"renewtoken"`
	User         KUUser `json:"user"`
}

type KUUser struct {
	LoginName    string    `json:"loginName"`
	IdCode       string    `json:"idCode"`
	TitleTh      string    `json:"titleTh"`
	TitleEn      string    `json:"titleEn"`
	FirstNameTh  string    `json:"firstNameTh"`
	MiddleNameTh string    `json:"middleNameTh"`
	LastNameTh   string    `json:"lastNameTh"`
	FirstNameEn  string    `json:"firstNameEn"`
	MiddleNameEn string    `json:"middleNameEn"`
	LastNameEn   string    `json:"lastNameEn"`
	Student      KUStudent `json:"student"`
}

type KUStudent struct {
	StdId string `json:"stdId"`
}

type RequestBody struct {
	Username string `json:"username"`
	Password string `json:"password"`
}

func getUserInfo(requestBody *RequestBody) (*ResponseBody, error) {
	client := &http.Client{}

	body, _ := json.Marshal(requestBody)

	req, _ := http.NewRequest("POST", API, bytes.NewBuffer(body))

	req.Header.Set("Content-Type", "application/json")
	req.Header.Set("app-Key", APP_KEY)

	resp, err := client.Do(req)

	if err != nil {
		return nil, err
	}
	defer resp.Body.Close()
	respBody, err := ioutil.ReadAll(resp.Body)

	if err != nil {
		return nil, err
	}

	response := new(ResponseBody)

	err = json.Unmarshal(respBody, response)

	if err != nil {
		return nil, err
	}

	return response, nil

}

func Signin(c *fiber.Ctx) error {
	requestBody := new(RequestBody)
	c.BodyParser(requestBody)

	user, err := getUserInfo(requestBody)

	if err != nil {
		return err
	}

	kuAccessTokenCookie := &fiber.Cookie{
		Name:    "ku_access_token",
		Value:   user.AccessToken,
		Expires: time.Now().Add(time.Minute * 30),
	}

	c.Cookie(kuAccessTokenCookie)

	// Signing Local's Token
	jwtToken := utils.JwtInstance()

	localToken, err := jwtToken.Sign(user.User.IdCode, user.User.TitleTh, user.User.FirstNameTh, user.User.LastNameTh)

	if err != nil {
		return fmt.Errorf("%v", err)
	}

	return c.JSON(map[string]string{
		"access_token": localToken,
	})
}
