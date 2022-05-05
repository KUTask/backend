package main

import (
	"os"

	"github.com/gofiber/fiber/v2"
)

func main() {
	app := fiber.New()

	app.Get("/", func(c *fiber.Ctx) error {
		return c.SendString("Hello, World!")
	})

	port := os.Getenv("PORT")

	if port == "" {
		port = "4000"
	}

	err := app.Listen(":" + port)
	if err != nil {
		panic(err)
	}
}
