package auth

import "github.com/gofiber/fiber/v2"

func Signout(c *fiber.Ctx) error {
	c.ClearCookie("access_token")
	c.ClearCookie("ku_access_token")

	return c.SendStatus(204)
}
